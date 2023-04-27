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
import { getUsersPet } from "../../data/Database";
import { UserContext } from "../../context/AuthContext";
import Card from "../../components/Card";
import Categories from "../../components/Categories";
const { height } = Dimensions.get("window");
const petCategories = [
  { name: "CATS", icon: "cat" },
  { name: "DOGS", icon: "dog" },
  { name: "BIRDS", icon: "bird" },
  { name: "BUNNIES", icon: "rabbit" },
];

const HomeScreen = ({ navigation }) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] = React.useState(0);
  const [filteredPets, setFilteredPets] = React.useState([]);

  const [filteredAnimals, setFilteredAnimals] = useState([]);
  const [selectedType, setSelectedType] = useState("");

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
    return item.animalType.includes("") ? (
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

  const authenticatedUser = useContext(UserContext);
  let userId = authenticatedUser.uid;
  const [petsRetrive, setPetsRetrive] = useState([]);
  const [numerOfPets, setNumberOfPets] = useState(0);
  // console.log(userId);
  useEffect(() => {
    const fetchPet = async () => {
      const petArray = await getUsersPet(userId);
      setPetsRetrive(petArray);
      setNumberOfPets(petsRetrive.length + 1);
    };
    fetchPet();
  }, [userId]);
  console.log(petsRetrive);

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
            source={require("../../assets/person.jpg")}
            style={{ height: 50, width: 50, borderRadius: 25 }}
          />
        </View>
        <SafeAreaView>
          <View style={style.mainContainer}>
            <View style={style.searchInputContainer}>
              <MaterialCommunityIcons
                name="magnify"
                size={24}
                color={COLORS.grey}
              />
              <TextInput
                placeholder="Cauta un animal"
                style={{ flex: 1 }}
                placeholderTextColor={COLORS.grey}
              />
              <MaterialCommunityIcons
                name="sort-ascending"
                size={24}
                color={COLORS.grey}
              />
            </View>
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
            <FlatList
              data={filteredAnimals}
              renderItem={renderAnimal}
              vertical
              decelerationRate="normal"
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item.name}
            />
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
