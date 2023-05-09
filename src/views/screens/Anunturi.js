import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  AntDesign,
} from "@expo/vector-icons";
import { editPet, getPet, deletePet } from "../../data/Database";
import COLORS from "../../const/colors";
const { height } = Dimensions.get("window");
import { firebase } from "../../../firebase";

const Anunturi = ({ navigation }) => {
  const [petsRetrive, setPetsRetrive] = useState([]);

  useEffect(() => {
    const fetchPet = async () => {
      const petArray = await getPet();
      setPetsRetrive(petArray);
      // setNumberOfPets(petsRetrive.length + 1);
    };
    fetchPet();
  }, []);

  const updateAcceptedPet = (petKey) => {
    Alert.alert(
      "Confirmare",
      "Sigur dorești să adaugi acest animal în lista de anunțuri?",
      [
        {
          text: "Nu",
          style: "cancel",
        },
        {
          text: "Da",
          onPress: () => {
            editPet(petKey, { accepted: "Acceptat" })
              .then(() => {
                // Remove the accepted pet from the pendingPets array
                const updatedPets = petsRetrive.filter(
                  (pet) => pet.key !== petKey
                );
                setPetsRetrive(updatedPets);
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  const stergeAnimal = (petKey) => {
    let formattedPath = `pets/${petKey}.jpeg`;
    Alert.alert(
      "Confirmation",
      "Are you sure you want to delete the pet?",
      [
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            deletePet(petKey, formattedPath)
              .then(() => {
                console.log(`Pet ${petKey} was deleted successfully!`);
                const updatedPets = petsRetrive.filter(
                  (pet) => pet.key !== petKey
                );
                setPetsRetrive(updatedPets);
              })
              .catch((error) => {
                console.log(error);
              });
          },
        },
      ],
      { cancelable: false }
    );
  };

  //filtram array ul de petsRetrieve care are obiectele noastre din baza de date dupa field-ul de "accepted" si punem in "pendingPets" toate animalele care au field-ul de accepted 0
  const pendingPets = petsRetrive.filter((pet) => pet.accepted === "");

  return (
    <SafeAreaView>
      {pendingPets.map((pet, index) => {
        return (
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("DetailsScreen", { list: pet })}
          >
            <View key={index} style={style.cardContainer}>
              <View style={style.cardImageContainer}>
                <Image
                  source={{ uri: pet.image }}
                  style={{ width: "100%", height: "100%", borderRadius: 20 }}
                />
              </View>
              <View style={style.cardDetailsContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text>{pet.name}</Text>
                  {pet.sex.includes("Femela") ? (
                    <Ionicons name="female" size={22} color={COLORS.grey} />
                  ) : (
                    <Ionicons name="male" size={22} color={COLORS.grey} />
                  )}
                </View>
                <Text
                  style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}
                >
                  <Text>{pet.animalType}</Text>
                </Text>
                <Text
                  style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}
                >
                  {parseInt(pet.age) === 1 ? (
                    <Text
                      style={{
                        fontSize: 10,
                        marginTop: 5,
                        color: COLORS.grey,
                      }}
                    >
                      <Text>{pet.age} an</Text>
                    </Text>
                  ) : (
                    // daca varsta nu e "1" atunci ne afiseaza "ani" in loc de "an"
                    <Text
                      style={{
                        fontSize: 10,
                        marginTop: 5,
                        color: COLORS.grey,
                      }}
                    >
                      <Text>{pet.age} ani</Text>
                    </Text>
                  )}
                </Text>
                <View style={{ marginTop: 5, flexDirection: "row" }}>
                  <MaterialCommunityIcons
                    name="map-marker"
                    size={18}
                    color={COLORS.primary}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      marginLeft: 5,
                      marginTop: 2,
                      color: COLORS.grey,
                    }}
                  >
                    <Text>
                      {pet.localitate}, jud.{pet.judet}
                    </Text>
                  </Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                  <Feather
                    name="x"
                    size={24}
                    color="red"
                    onPress={() => stergeAnimal(pet.key)}
                  />
                  <AntDesign
                    name="check"
                    size={24}
                    color="green"
                    onPress={() => updateAcceptedPet(pet.key)}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

export default Anunturi;

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
