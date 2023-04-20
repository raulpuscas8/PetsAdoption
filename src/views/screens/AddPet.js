import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  Image,
} from "react-native";
import COLORS from "../../const/colors";
import React, { useDebugValue, useState } from "react";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../Input/CustomInput";
import { firebase } from "../../../firebase";
import * as ImagePicker from "expo-image-picker";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";
import { addPet, addImage } from "../../data/Database";

const AddPet = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const authenticatedUser = useContext(UserContext);
  let userId = authenticatedUser.uid;
  console.log(userId);

  const [data, setData] = useState({
    name: "",
    animalType: "",
    breed: "",
    age: "",
    sex: "",
    location: "",
  });

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.2,
    });

    if (!result.canceled) {
      setPhoto(result.uri);
    }
  };
  const handleOnChange = (text, data) => {
    setData((prevState) => ({ ...prevState, [data]: text }));
  };
  const handleError = (errorMessage, data) => {
    setErrors((prevState) => ({ ...prevState, [data]: errorMessage }));
  };

  const clearInputs = () => {
    setData({
      name: "",
      animalType: "",
      breed: "",
      age: "",
      sex: "",
      location: "",
    });
  };

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
    if (!data.animalType) {
      valid = false;
      handleError("Please input your animal type!", "animalType");
    }
    if (!data.breed) {
      valid = false;
      handleError("Please select animal breed", "breed");
    }
    if (!data.age) {
      valid = false;
      handleError("Please select your pet age!", "age");
    }
    if (!data.sex) {
      valid = false;
      handleError("Please select your pet sex!", "sex");
    }
    if (!data.location) {
      valid = false;
      handleError("Please select your location!", "location");
    }
    console.log(data);
    // console.log(photo);
    console.log(valid);
    if (valid) {
      try {
        const response = await addPet(
          userId,
          data.name,
          data.animalType,
          data.breed,
          data.age,
          data.sex,
          data.location
        );
        const imagePath = `pets/${userId}/${response}.jpeg`;
        const responseImage = await addImage(photo, imagePath);
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
      navigation.navigate("Home");
    }
  };

  return (
    <ScrollView>
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
          <CustomInput
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
          />
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
          <CustomInput
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
          />
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
