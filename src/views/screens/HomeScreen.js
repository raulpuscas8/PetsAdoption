import React, { useState, useEffect, useContext } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import pets from "../../const/pets";
import COLORS from "../../const/colors";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { firebase } from "../../../firebase";
import { getPet } from "../../data/Database";
import { UserContext } from "../../context/AuthContext";
import Card from "../../components/Card";
import Categories from "../../components/Categories";
import { useFocusEffect } from "@react-navigation/native";
import CardToate from "../../components/CardToate";
import SearchBar from "../../components/SearchBar";
import { getImageURL } from "../../data/Database";

const { height } = Dimensions.get("window");
const petCategories = [
  { name: "CATS", icon: "cat" },
  { name: "DOGS", icon: "dog" },
  { name: "BIRDS", icon: "bird" },
  { name: "BUNNIES", icon: "rabbit" },
];

const HomeScreen = ({ navigation, route }) => {
  const [user, setUser] = useState();
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);
  const [userPhoto, setUserPhoto] = useState();

  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const numberOfPets = route.params;

  useEffect(() => {
    if (selectedType) {
      const filteredData = petsRetrive.filter(
        (animal) => animal.animalType === selectedType
      );
      setFilteredAnimals(filteredData);
    } else {
      setFilteredAnimals(petsRetrive);
    }
  }, [selectedType, petsRetrive]);

  const renderAnimal = ({ item }) => {
    return item.animalType.includes("") ? ( // item.accepted.includes("1") daca accepta admninul, accepted va fi pe 1 si ar trebui sa apara cardul cu animalul pt ca este validat de admin
      <Card list={item} navigation={navigation} />
    ) : item.animalType.includes("Pisica") ? (
      <Card list={item} navigation={navigation} />
    ) : item.animalType.includes("Caine") ? (
      <Card list={item} navigation={navigation} />
    ) : item.animalType.includes("Pasare") ? (
      <Card list={item} navigation={navigation} />
    ) : item.animalType.includes("Iepure") ? (
      <Card list={item} navigation={navigation} />
    ) : null;
  };

  const filterPet = (index) => {
    const currentPets = pets.filter(
      (item) => item?.pet?.toUpperCase() == petCategories[index].name
    )[0].pets;
    setFilteredPets(currentPets);
  };
  React.useEffect(() => {
    filterPet(0);
  }, []);

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
            setUsername(userDoc.data().username);
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
  const authenticatedUser = useContext(UserContext);
  let userId = authenticatedUser.uid;
  const [petsRetrive, setPetsRetrive] = useState([]);
  // const [numberOfPets, setNumberOfPets] = useState(0);
  // console.log(userId);
  // useEffect(() => {
  //   const fetchPet = async () => {
  //     const petArray = await getUsersPet(userId);
  //     setPetsRetrive(petArray);
  //   };
  //   fetchPet();
  // }, [userId, numberOfPets]);
  // console.log(petsRetrive);
  useFocusEffect(
    React.useCallback(() => {
      const fetchPet = async () => {
        const petArray = await getPet();
        setPetsRetrive(petArray);
        // setNumberOfPets(petsRetrive.length + 1);
      };
      fetchPet();

      async function getUsersImage() {
        const currentUserEmail = firebase.auth().currentUser.email;
        const imagePath = `users/${currentUserEmail}.jpeg`;
        const responseImage = await getImageURL(imagePath);
        setUserPhoto(responseImage);
      }
      getUsersImage();
    }, [userId, numberOfPets])
  );

  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      <ScrollView>
        <View style={style.header}>
          <MaterialCommunityIcons
            name="sort-variant"
            size={28}
            onPress={navigation.toggleDrawer}
          />
          <Text
            style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 20 }}
          >
            {username}
          </Text>
          <Image
            source={{ uri: userPhoto }}
            style={{ height: 50, width: 50, borderRadius: 30 }}
          />
        </View>
        <SafeAreaView>
          <View style={style.mainContainer}>
            <SearchBar item={petsRetrive} navigation={navigation} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setSelectedType("")}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedType === "" ? COLORS.white : COLORS.primary,
                    },
                  ]}
                >
                  <Text
                    style={[
                      {
                        color:
                          selectedType === "" ? COLORS.primary : COLORS.white,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    Toate
                  </Text>
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{petsRetrive.name}</Text>
              </View>
              {/* categoria de pisica */}
              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setSelectedType("Pisica")}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedType === "Pisica"
                          ? COLORS.white
                          : COLORS.primary,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="cat"
                    size={30}
                    color={
                      selectedType === "Pisica" ? COLORS.primary : COLORS.white
                    }
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{petsRetrive.name}</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setSelectedType("Caine")}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedType === "Caine"
                          ? COLORS.white
                          : COLORS.primary,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="dog"
                    size={30}
                    color={
                      selectedType === "Caine" ? COLORS.primary : COLORS.white
                    }
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{petsRetrive.name}</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setSelectedType("Pasare")}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedType === "Pasare"
                          ? COLORS.white
                          : COLORS.primary,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="bird"
                    size={30}
                    color={
                      selectedType === "Pasare" ? COLORS.primary : COLORS.white
                    }
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{petsRetrive.name}</Text>
              </View>

              <View style={{ alignItems: "center" }}>
                <TouchableOpacity
                  onPress={() => setSelectedType("Iepure")}
                  style={[
                    style.categoryBtn,
                    {
                      backgroundColor:
                        selectedType === "Iepure"
                          ? COLORS.white
                          : COLORS.primary,
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name="rabbit"
                    size={30}
                    color={
                      selectedType === "Iepure" ? COLORS.primary : COLORS.white
                    }
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{petsRetrive.name}</Text>
              </View>
            </View>
            {selectedType === "" ? (
              petsRetrive.map((x) => (
                <CardToate
                  // name={x.name}
                  // animalType={x.animalType}
                  // age={x.age}
                  // judet={x.judet}
                  // localitate={x.localitate}
                  // image={x.image}
                  // sex={x.sex}
                  navigation={navigation}
                  list={x}
                />
              ))
            ) : (
              <FlatList
                data={filteredAnimals}
                renderItem={renderAnimal}
                vertical
                decelerationRate="normal"
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item) => item.name}
              />
            )}
            {/* <FlatList
              data={filteredAnimals}
              renderItem={renderAnimal}
              vertical
              decelerationRate="normal"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
            /> */}
          </View>
        </SafeAreaView>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  cardDetailsContainer: {
    height: 120,
    backgroundColor: COLORS.light,
    flex: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    padding: 20,
    justifyContent: "center",
  },
  cardImageContainer: {
    height: 150,
    width: 140,
    backgroundColor: COLORS.white,
    borderRadius: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    minHeight: height,
    backgroundColor: COLORS.nude,
    marginTop: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  searchInputContainer: {
    height: 50,
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    alignItems: "space-between",
    borderRadius: 20,
  },
  categoryBtn: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: COLORS.primary,
  },
  categoryBtnName: {
    color: COLORS.dark,
    fontSize: 10,
    marginTop: 5,
    fontWeight: "bold",
  },
});
export default HomeScreen;
