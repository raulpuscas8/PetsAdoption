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
} from "react-native";
import COLORS from "../../const/colors";
import FeatherIcon from "react-native-vector-icons/Feather";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { firebase } from "../../../firebase";

const SECTIONS = [
  {
    header: "Preferințe",
    items: [
      { id: "language", icon: "globe", label: "Limbă", type: "select" },
      {
        id: "eye",
        icon: "message-circle",
        label: "Permite mesaje",
        type: "toggle",
      },
      {
        id: "wifi",
        icon: "phone-call",
        label: "Permite apeluri",
        type: "toggle",
      },
    ],
  },
  {
    header: "Ajutor",
    items: [
      { id: "bug", icon: "flag", label: "Raportați o eroare", type: "link" },
      { id: "contact", icon: "mail", label: "Contactaţi-ne", type: "link" },
    ],
  },
  {
    header: "Setările contului",
    items: [
      { id: "save", icon: "heart", label: "Spune unui prieten", type: "link" },
      {
        id: "download",
        icon: "delete",
        label: "Stergere Cont",
        type: "link",
      },
      { id: "About", icon: "info", label: "Despre aplicatie", type: "link" },
    ],
  },
];

export default function SettingsScreen({ navigation }) {
  const [form, setForm] = useState({
    language: "English",
    eye: true,
    wifi: false,
  });

  const [username, setUsername] = useState("");
  useEffect(() => {
    const userEmail = firebase.auth().currentUser.email;
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .get()
      .then((item) => {
        if (item.exists) {
          setUsername(item.data().username);
        } else {
          console.log("User data not found");
        }
      })
      .catch((error) => {
        console.log("Error getting user data: ", error);
      });
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

        {SECTIONS.map(({ header, items }) => (
          <View style={styles.section} key={header}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionHeaderText}>{header}</Text>
            </View>
            <View style={styles.sectionBody}>
              {items.map(({ id, label, icon, type, value }, index) => {
                return (
                  <View
                    key={id}
                    style={[
                      styles.rowWrapper,
                      index === 0 && { borderTopWidth: 0 },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        // handle onPress
                      }}
                    >
                      <View style={styles.row}>
                        <FeatherIcon
                          color="#616161"
                          name={icon}
                          style={styles.rowIcon}
                          size={22}
                        />

                        <Text style={styles.rowLabel}>{label}</Text>

                        <View style={styles.rowSpacer} />

                        {type === "select" && (
                          <Text style={styles.rowValue}>{form[id]}</Text>
                        )}

                        {type === "toggle" && (
                          <Switch
                            onChange={(val) => setForm({ ...form, [id]: val })}
                            value={form[id]}
                          />
                        )}

                        {(type === "select" || type === "link") && (
                          <FeatherIcon
                            color="#ababab"
                            name="chevron-right"
                            size={22}
                          />
                        )}
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        ))}
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
  },
  sectionBody: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e3e3e3",
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
