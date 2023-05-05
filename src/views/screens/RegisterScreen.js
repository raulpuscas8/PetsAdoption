import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import COLORS from "../../const/colors";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../Input/CustomInput";
import { firebase } from "../../../firebase";
import { addImage } from "../../data/Database";

const RegisterScreen = ({ navigation }) => {
  const [photo, setPhoto] = useState(null);
  const [errors, setErrors] = useState({});
  const [data, setData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const firebaseError1 =
    "Firebase: The email address is already in use by another account. (auth/email-already-in-use).";

  const validari = async (
    email,
    username,
    phone,
    password,
    confirmPassword
  ) => {
    Keyboard.dismiss();
    let valid = true; //setam prima data pe true si daca o validare nu este ok se setaza pe false
    if (!data.email) {
      valid = false;
      handleError("Adaugati un email!", "email");
    } else if (!data.email.match(/\S+@\S+.\S+/)) {
      valid = false;
      handleError("Adaugati un email valid!", "email");
    }

    if (!data.username) {
      valid = false;
      handleError("Adaugati un nume de utilizator!", "username");
    }
    if (!data.phone) {
      valid = false;
      handleError("Adaugati un numar de telefon!", "phone");
    }
    if (!data.password) {
      valid = false;
      handleError("Adaugati o parola!", "password");
    } else if (data.password.length < 8) {
      valid = false;
      handleError("Parola trebuie sa contina minim 8 caractere!", "password");
    }
    if (!data.confirmPassword) {
      valid = false;
      handleError("Adaugati o parola!", "confirmPassword");
    } else if (data.confirmPassword !== data.password) {
      valid = false;
      handleError("Parolele trebuie sa fie identice!", "confirmPassword");
    }
    if (!photo) {
      valid = false;
      handleError("Please input your pet's photo!", "photo");
    }
    if (valid) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        firebase
          .firestore()
          .collection("users")
          .doc(email)
          .set({
            email,
            username,
            phone,
          })
          .catch((error) => {
            console.log("Error adding user data to Firestore: ", error);
          });
        // const Iduser = firebase.auth().currentUser.uid;
        // console.log(Iduser);
        // authenticatedUser.getUserId(userId);
        const imagePath = `users/${email}.jpeg`;
        const responseImage = await addImage(photo, imagePath);
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleOnChange = (text, data) => {
    setData((prevState) => ({ ...prevState, [data]: text }));
  };
  const handleError = (errorMessage, data) => {
    setErrors((prevState) => ({ ...prevState, [data]: errorMessage }));
  };
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

  return (
    <SafeAreaView>
      <ScrollView>
        <View
          style={{
            padding: 20,
          }}
        >
          <View
            style={{
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 35,
                color: COLORS.primary,
                fontWeight: "bold",
                marginVertical: 30,
              }}
            >
              Creați un cont
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
                maxWidth: "95%",
                textAlign: "center",
              }}
            >
              Alăturați-vă comunității noastre astăzi și începeți căutarea unui
              nou prieten, creându-vă contul acum!
            </Text>
          </View>
          <View
            style={{
              marginVertical: 1,
            }}
          >
            <CustomInput
              placeholder="Email"
              autoCapitalize="none"
              placeholderTextColor={COLORS.dark}
              style={{
                fontWeight: "bold",
                fontSize: 14,
                padding: 20,
                backgroundColor: COLORS.nude,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onChangeText={(text) => handleOnChange(text, "email")}
              error={errors.email}
              onFocus={() => {
                handleError(null, "email");
              }}
            />
            <CustomInput
              placeholder="Nume de utilizator"
              placeholderTextColor={COLORS.dark}
              style={{
                fontWeight: "bold",
                fontSize: 14,
                padding: 20,
                backgroundColor: COLORS.nude,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onChangeText={(text) => handleOnChange(text, "username")}
              error={errors.username}
              onFocus={() => {
                handleError(null, "username");
              }}
            />
            <CustomInput
              keyboardType="numeric"
              placeholder="Numar de telefon"
              placeholderTextColor={COLORS.dark}
              style={{
                fontWeight: "bold",
                fontSize: 14,
                padding: 20,
                backgroundColor: COLORS.nude,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onChangeText={(text) => handleOnChange(text, "phone")}
              error={errors.phone}
              onFocus={() => {
                handleError(null, "phone");
              }}
            />
            <CustomInput
              placeholder="Parola"
              placeholderTextColor={COLORS.dark}
              style={{
                fontWeight: "bold",
                fontSize: 14,
                padding: 20,
                backgroundColor: COLORS.nude,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onChangeText={(text) => handleOnChange(text, "password")}
              error={errors.password}
              onFocus={() => {
                handleError(null, "password");
              }}
              password
            />
            <CustomInput
              placeholder="Confirmare parola"
              placeholderTextColor={COLORS.dark}
              style={{
                fontWeight: "bold",
                fontSize: 14,
                padding: 20,
                backgroundColor: COLORS.nude,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onChangeText={(text) => handleOnChange(text, "confirmPassword")}
              error={errors.confirmPassword}
              onFocus={() => {
                handleError(null, "confirmPassword");
              }}
              password
            />
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
          </View>
          <TouchableOpacity
            onPress={() => {
              validari(
                data.email,
                data.username,
                data.phone,
                data.password,
                data.confirmPassword
              );
            }}
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
              Înscrie-te
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{
              padding: 20,
            }}
          >
            <Text
              onPress={() => navigation.navigate("LoginScreen")}
              style={{
                fontWeight: "bold",
                color: COLORS.dark,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Am deja un cont
            </Text>
          </TouchableOpacity>
          <View
            style={{
              marginVertical: 30,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.primary,
                textAlign: "center",
                fontSize: 14,
              }}
            >
              Sau continuă cu
            </Text>
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: COLORS.darkgrey,
                  borderRadius: 5,
                  marginHorizontal: 10,
                }}
              >
                <Ionicons name="logo-google" color={COLORS.dark} size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: COLORS.darkgrey,
                  borderRadius: 5,
                  marginHorizontal: 10,
                }}
              >
                <Ionicons name="logo-apple" color={COLORS.dark} size={20} />
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  padding: 10,
                  backgroundColor: COLORS.darkgrey,
                  borderRadius: 5,
                  marginHorizontal: 10,
                }}
              >
                <Ionicons name="logo-facebook" color={COLORS.dark} size={20} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
//done
