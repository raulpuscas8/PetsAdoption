import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
  Pressable,
} from "react-native";
import COLORS from "../../const/colors";
import React, { useDebugValue, useState, useEffect } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInput from "../Input/CustomInput";
import { firebase } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";
import { addPet, addImage } from "../../data/Database";
import { getUnixTime } from "date-fns"; // pentru data

const GENDER = {
  MASCUL: "Mascul",
  FEMELA: "Femela",
};
const TIPURI_ANIMALE = {
  PISICA: "Pisica",
  CAINE: "Caine",
  PASARE: "Pasare",
  IEPURE: "Iepure",
};

const AddPet = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const authenticatedUser = useContext(UserContext);
  let userId = authenticatedUser.uid;
  console.log(userId);

  const [gender, setGender] = useState(GENDER.MASCUL);
  const [tipuri_animale, setTipuri_animale] = useState(TIPURI_ANIMALE.PISICA);
  const [numberOfPets, setNumberOfPets] = useState(0);

  const [data, setData] = useState({
    name: "",
    animalType: "",
    breed: "",
    age: "",
    sex: "",
    location: "",
    description: "",
    addedOn: "", // add the addedOn field to the data object
    userName: "",
    email: "",
    accepted: "", //un status: sa fie 0/1 daca vreau sa accept sau nu un anunt
  });

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri); // setPhoto(result.assets[0].uri);
    }
  };
  const handleOnChange = (text, data) => {
    setData((prevState) => ({ ...prevState, [data]: text }));
  };
  const handleError = (errorMessage, data) => {
    setErrors((prevState) => ({ ...prevState, [data]: errorMessage }));
  };

  // const clearInputs = () => {
  //   setData({
  //     name: "",
  //     animalType: "",
  //     breed: "",
  //     age: "",
  //     sex: "",
  //     location: "",
  //     description: "",
  //     userName: "",
  //     email: "",
  //     accepted: 0
  //   });
  // };

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

  let valid;

  const submitForm = async () => {
    valid = true;

    if (!photo) {
      valid = false;
      handleError("Please input your pet's photo!", "photo");
    }
    if (!data.name) {
      valid = false;
      handleError("Please input your pet's name!", "name");
    }
    // if (!data.animalType) {
    //   valid = false;
    //   handleError("Please input your animal type!", "animalType");
    // }
    if (!data.breed) {
      valid = false;
      handleError("Please select animal breed", "breed");
    }
    if (!data.age) {
      valid = false;
      handleError("Please select your pet age!", "age");
    }
    // if (!data.sex) {
    //   valid = false;
    //   handleError("Please select your pet sex!", "sex");
    // }
    if (!data.location) {
      valid = false;
      handleError("Please select your location!", "location");
    }
    if (!data.description) {
      valid = false;
      handleError(
        "Va rugam, introduceti cateva cuvinte despre animalut!",
        "description"
      );
    }
    //console.log(data);
    // console.log(photo);
    //console.log(valid);
    if (valid) {
      try {
        const unixTime = getUnixTime(new Date());
        const response = await addPet(
          userId,
          data.name,
          tipuri_animale,
          data.breed,
          data.age,
          gender,
          data.location,
          data.description,
          unixTime, //pass the current date and time as the addedOn field
          username,
          firebase.auth().currentUser?.email,
          0
        );
        //animalCounter++;
        const imagePath = `pets/${userId}/${response}.jpeg`;
        const responseImage = await addImage(photo, imagePath);
        setNumberOfPets(numberOfPets + 1);
        setData({ name: "" });
        // setNumberOfFriends(numberOfFriends + 1);
      } catch (error) {
        console.log(error);
      }
      // setName("");
      // setAnimalType("");
      // setBreed("");
      // setAge("");
      // setSex("");
      // setLocation("");
      setPhoto(null);
      setErrors({});
      navigation.navigate("Home", { numberOfPets });
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator="false">
      <View
        style={{
          padding: 20,
          backgroundColor: COLORS.white,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <Text
            style={{
              padding: 10,
              fontSize: 35,
              color: COLORS.black,
              fontWeight: "bold",
              marginVertical: 30,
              textAlign: "center",
            }}
          >
            Adaugă un animal de companie!
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              maxWidth: "95%",
              textAlign: "center",
              color: COLORS.primary,
            }}
          >
            Aici poți să adaugi informațiile despre animalul tău de companie:
          </Text>
        </View>
        <View>
          <CustomInput
            placeholder="Nume"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(name) => setData({ ...data, name })}
            error={errors.name}
            onFocus={() => {
              handleError(null, "name");
            }}
          />
          {/* <CustomInput
            placeholder="Tipul animalului"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(text) => handleOnChange(text, "animalType")}
            error={errors.animalType}
            onFocus={() => {
              handleError(null, "animalType");
            }}
          /> */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ paddingHorizontal: 30 }}>
              <Pressable
                onPress={() => setTipuri_animale(TIPURI_ANIMALE.PISICA)}
              >
                <MaterialCommunityIcons
                  name="cat"
                  size={40}
                  color={
                    tipuri_animale === TIPURI_ANIMALE.PISICA
                      ? COLORS.primary
                      : COLORS.black
                  }
                />
              </Pressable>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
              <Pressable
                onPress={() => setTipuri_animale(TIPURI_ANIMALE.CAINE)}
              >
                <MaterialCommunityIcons
                  name="dog"
                  size={40}
                  color={
                    tipuri_animale === TIPURI_ANIMALE.CAINE
                      ? COLORS.primary
                      : COLORS.black
                  }
                />
              </Pressable>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
              <Pressable
                onPress={() => setTipuri_animale(TIPURI_ANIMALE.PASARE)}
              >
                <MaterialCommunityIcons
                  name="bird"
                  size={40}
                  color={
                    tipuri_animale === TIPURI_ANIMALE.PASARE
                      ? COLORS.primary
                      : COLORS.black
                  }
                />
              </Pressable>
            </View>
            <View style={{ paddingHorizontal: 30 }}>
              <Pressable
                onPress={() => setTipuri_animale(TIPURI_ANIMALE.IEPURE)}
              >
                <MaterialCommunityIcons
                  name="rabbit"
                  size={40}
                  color={
                    tipuri_animale === TIPURI_ANIMALE.IEPURE
                      ? COLORS.primary
                      : COLORS.black
                  }
                />
              </Pressable>
            </View>
          </View>
          <CustomInput
            placeholder="Rasă"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(text) => handleOnChange(text, "breed")}
            error={errors.breed}
            onFocus={() => {
              handleError(null, "breed");
            }}
          />
          <CustomInput
            keyboardType="numeric"
            placeholder="Varstă"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(text) => handleOnChange(text, "age")}
            error={errors.age}
            onFocus={() => {
              handleError(null, "age");
            }}
          />
          {/* <CustomInput
            placeholder="Sex"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(text) => handleOnChange(text, "sex")}
            error={errors.sex}
            onFocus={() => {
              handleError(null, "sex");
            }}
          /> */}
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={{ paddingHorizontal: 30 }}>
              <TouchableOpacity onPress={() => setGender(GENDER.FEMELA)}>
                <Ionicons
                  name="female"
                  size={40}
                  color={
                    gender === GENDER.FEMELA ? COLORS.primary : COLORS.black
                  }
                />
              </TouchableOpacity>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <Pressable onPress={() => setGender(GENDER.MASCUL)}>
                <Ionicons
                  name="male"
                  size={40}
                  color={
                    gender === GENDER.MASCUL ? COLORS.primary : COLORS.black
                  }
                />
              </Pressable>
            </View>
          </View>
          <CustomInput
            placeholder="Localitate+Județ"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(text) => handleOnChange(text, "location")}
            error={errors.location}
            onFocus={() => {
              handleError(null, "location");
            }}
          />
          <CustomInput
            placeholder="Despre animal"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onChangeText={(text) => handleOnChange(text, "description")}
            error={errors.description}
            onFocus={() => {
              handleError(null, "description");
            }}
          />
        </View>
        <TouchableOpacity
          onPress={handleSelectImage}
          style={{
            padding: 20,
            backgroundColor: COLORS.primary,
            marginVertical: 30,
            borderRadius: 10,
            shadowColor: COLORS.primary,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.white,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Adaugă Poză
          </Text>
        </TouchableOpacity>
        {photo ? (
          <Image
            style={{
              justifyContent: "center",
              borderRadius: 20,
              width: 400,
              height: 400,
            }}
            source={{ uri: photo }}
          />
        ) : null}
        <TouchableOpacity
          onPress={submitForm}
          style={{
            padding: 20,
            backgroundColor: COLORS.primary,
            marginVertical: 30,
            borderRadius: 10,
            shadowColor: COLORS.primary,
            shadowOffset: {
              width: 0,
              height: 10,
            },
            shadowOpacity: 0.3,
            shadowRadius: 10,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: COLORS.white,
              textAlign: "center",
              fontSize: 20,
            }}
          >
            Adaugă
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 20,
          }}
        >
          <Text
            onPress={navigation.goBack}
            style={{
              fontWeight: "bold",
              color: COLORS.dark,
              textAlign: "center",
              fontSize: 14,
            }}
          >
            Renunță
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddPet;

const styles = StyleSheet.create({});
