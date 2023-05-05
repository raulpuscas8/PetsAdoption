import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  Switch,
  Modal,
  Alert,
  Share,
} from "react-native";
import COLORS from "../../const/colors";
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { firebase } from "../../../firebase";
import ModalAbout from "../../components/Modals/ModalAbout";
import ModalLegal from "../../components/Modals/ModalLegal";
import * as MailComposer from "expo-mail-composer";

// const SECTIONS = [
//   {
//     header: "Preferințe",
//     items: [
//       { id: "language", icon: "globe", label: "Limbă", type: "select" },
//       // {
//       //   id: "eye",
//       //   icon: "message-circle",
//       //   label: "Permite mesaje",
//       //   type: "toggle",
//       // },
//       // {
//       //   id: "wifi",
//       //   icon: "phone-call",
//       //   label: "Permite apeluri",
//       //   type: "toggle",
//       // },
//     ],
//   },
//   // {
//   //   header: "Ajutor",
//   //   items: [
//   //     { id: "bug", icon: "flag", label: "Raportați o eroare", type: "link" },
//   //     { id: "contact", icon: "mail", label: "Contactaţi-ne", type: "link" },
//   //   ],
//   // },
//   // {
//   //   header: "Setările contului",
//   //   items: [
//   //     { id: "save", icon: "heart", label: "Spune unui prieten", type: "link" },
//   //     {
//   //       id: "download",
//   //       icon: "delete",
//   //       label: "Stergere Cont",
//   //       type: "link",
//   //     },
//   //     { id: "About", icon: "info", label: "Despre aplicatie", type: "link" },
//   //   ],
//   // },
// ];

export default function SettingsScreen({ navigation }) {
  const [isModalAbout, setIsModalAbout] = useState(false);
  const [isModalLegal, setIsModalLegal] = useState(false);
  const [despreaplicatie, setDespreAplicatie] = useState(false);
  const [form, setForm] = useState({
    language: "English",
    eye: true,
    wifi: false,
  });

  const [username, setUsername] = useState("");
  useEffect(() => {
    // const userEmail = firebase.auth().currentUser.email;
    // firebase
    //   .firestore()
    //   .collection("users")
    //   .doc(userEmail)
    //   .get()
    //   .then((item) => {
    //     if (item.exists) {
    //       setUsername(item.data().username);
    //     } else {
    //       console.log("User data not found");
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("Error getting user data: ", error);
    //   });
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      const userEmail = currentUser.email;
      const userQuery = firebase
        .firestore()
        .collection("users")
        .doc(userEmail)
        .get();
      const adminsQuery = firebase
        .firestore()
        .collection("admins")
        .doc(userEmail)
        .get();

      Promise.all([userQuery, adminsQuery])
        .then((results) => {
          const userDoc = results[0];
          const adminsDoc = results[1];

          if (userDoc.exists) {
            setUsername(userDoc.data().fullname);
          } else if (adminsDoc.exists) {
            setUsername(adminsDoc.data().fullname);
          } else {
            console.log("User data not found");
          }
        })
        .catch((error) => {
          console.log("Error getting user data: ", error);
        });
    }
  }, []);

  const handleSignOut = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        navigation.navigate("WelcomeScreen");
      })
      .catch((error) => alert(error.message));
  };

  function handleEmailPress() {
    MailComposer.composeAsync({
      recipients: ["raul.puscas86@gmail.com"],
      subject: "Pawsitive Adoption",
      body: "",
    });
  }
  function handleEmailPressProblem() {
    MailComposer.composeAsync({
      recipients: ["raul.puscas86@gmail.com"],
      subject: "Problemă Pawsitive Adoption",
      body: "Doresc să raportez o probemă",
    });
  }

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.lightorange }}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={20}
            color={COLORS.dark}
            onPress={navigation.goBack}
          />
          <Text style={styles.title}>Setări</Text>

          <Text style={styles.subtitle}>
            Poți să îți modifici setările de aici
          </Text>
        </View>

        <View style={styles.profile}>
          <Image
            source={require("../../assets/person.jpg")}
            style={{ height: 80, width: 80, borderRadius: 40 }}
          />

          <Text style={styles.profileName}>{username}</Text>

          <Text style={styles.profileEmail}>
            {firebase.auth().currentUser?.email}
          </Text>

          <TouchableOpacity onPress={handleSignOut}>
            <View style={styles.profileAction}>
              <Text style={styles.profileActionText}>Deconectare</Text>

              <FeatherIcon color="#fff" name="edit" size={16} />
            </View>
          </TouchableOpacity>
        </View>

        {/* {SECTIONS.map(({ header, items }) => ( */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Ajutor</Text>
          </View>
          <View style={styles.sectionBody}>
            {/* {items.map(({ id, label, icon, type, value }, index) => { */}
            {/* return ( */}
            <View style={[styles.rowWrapper && { borderTopWidth: 0 }]}>
              <TouchableOpacity onPress={handleEmailPressProblem}>
                <View style={styles.row}>
                  <FeatherIcon
                    color="#616161"
                    name="flag"
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>Raportați o eroare</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleEmailPress}>
                <View style={styles.row}>
                  <FeatherIcon
                    color="#616161"
                    name="mail"
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>Contactaţi-ne</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Setari de cont</Text>
          </View>
          <View style={styles.sectionBody}>
            {/* {items.map(({ id, label, icon, type, value }, index) => { */}
            {/* return ( */}
            <View style={[styles.rowWrapper && { borderTopWidth: 0 }]}>
              <TouchableOpacity
                onPress={() => {
                  Share.share({
                    url: "https://www.facebook.com/raul.ioan.1/",
                    title: "Pawsitive Adoption",
                  });
                }}
              >
                <View style={styles.row}>
                  <FeatherIcon
                    color="#616161"
                    name="heart"
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>Spune unui prieten</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    "Ștergere cont",
                    "Sunteți sigur că doriți să ștergeți acest cont?",
                    [
                      {
                        text: "Da",
                        onPress: () => {
                          const user = firebase.auth().currentUser;
                          const email = user.email;
                          user
                            .delete()
                            .then(() => {
                              console.log("User account deleted.");
                              firebase
                                .firestore()
                                .collection("users")
                                .doc(email)
                                .delete()
                                .then(() => {
                                  console.log("User document deleted.");
                                  handleSignOut();
                                })
                                .catch((error) => {
                                  console.log(
                                    "Error deleting user document: ",
                                    error
                                  );
                                });
                            })
                            .catch((error) => {
                              console.log(
                                "Error deleting user account: ",
                                error
                              );
                            });
                        },
                      },
                      {
                        text: "Nu",
                        style: "cancel",
                      },
                    ],
                    { cancelable: false }
                  )
                }
              >
                <View style={styles.row}>
                  <FeatherIcon
                    color="#616161"
                    name="delete"
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>Sterge cont</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Mai multe informații</Text>
          </View>
          <View style={styles.sectionBody}>
            <View style={[styles.rowWrapper && { borderTopWidth: 0 }]}>
              <TouchableOpacity onPress={() => setIsModalAbout(true)}>
                <View style={styles.row}>
                  <FeatherIcon
                    color="#616161"
                    name="info"
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>Despre noi</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
              {isModalAbout && (
                <ModalAbout
                  navigation={navigation}
                  isVisible={isModalAbout}
                  onClose={() => setIsModalAbout(false)}
                ></ModalAbout>
              )}
              <TouchableOpacity onPress={() => setIsModalLegal(true)}>
                <View style={styles.row}>
                  <MaterialCommunityIcons
                    color="#616161"
                    name="gavel"
                    style={styles.rowIcon}
                    size={22}
                  />

                  <Text style={styles.rowLabel}>Acord de licențiere</Text>

                  <View style={styles.rowSpacer} />
                </View>
              </TouchableOpacity>
              {isModalLegal && (
                <ModalLegal
                  navigation={navigation}
                  isVisible={isModalLegal}
                  onClose={() => setIsModalLegal(false)}
                ></ModalLegal>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 24,
    backgroundColor: COLORS.lightorange,
  },
  section: {
    paddingTop: 12,
  },
  sectionHeader: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#a7a7a7",
    textTransform: "uppercase",
    letterSpacing: 1.2,
    marginTop: 15,
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
    marginLeft: 20,
  },
  header: {
    paddingLeft: 24,
    paddingRight: 24,
    marginBottom: 12,
    backgroundColor: COLORS.lightorange,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
  },
  profile: {
    padding: 16,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: COLORS.lightorange,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: 9999,
  },
  profileName: {
    marginTop: 12,
    fontSize: 20,
    fontWeight: "600",
    color: "#090909",
  },
  profileEmail: {
    marginTop: 6,
    fontSize: 16,
    fontWeight: "400",
    color: "#848484",
  },
  profileAction: {
    marginTop: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.primary,
    borderRadius: 12,
  },
  profileActionText: {
    marginRight: 8,
    fontSize: 15,
    fontWeight: "600",
    color: "#fff",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingRight: 24,
    height: 50,
  },
  rowWrapper: {
    paddingLeft: 24,
    backgroundColor: COLORS.nude,
    borderTopWidth: 1,
    borderColor: "#e3e3e3",
  },
  rowIcon: {
    marginRight: 12,
  },
  rowLabel: {
    fontSize: 17,
    fontWeight: "500",
    color: "#000",
  },
  rowValue: {
    fontSize: 17,
    color: "#616161",
    marginRight: 4,
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});
