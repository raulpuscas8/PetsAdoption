import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import COLORS from "../../const/colors";
import React, { useState } from "react";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../Input/CustomInput";
import { firebase } from "../../../firebase";

const RegisterScreen = ({ navigation }) => {
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
      handleError("Adaugati un email!", "email");
    }

    if (!data.username) {
      valid = false;
      handleError("Adaugati un username!", "username");
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
    if (valid) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          const userEmail = firebase.auth().currentUser.email;
          firebase
            .firestore()
            .collection("users")
            .doc(userEmail)
            .set({
              email,
              username,
              phone,
            })
            .then(() => {
              console.log("User data added to Firestore.");
            })
            .catch((error) => {
              console.log("Error adding user data to Firestore: ", error);
            });
          navigation.navigate("HomeScreen");
        })
        .catch((error) => {
          if (error.message === firebaseError1) {
            handleError("Mai exista un cont cu acelasi email creat!", "email");
          }
        });
    }
  };
  const handleOnChange = (text, data) => {
    setData((prevState) => ({ ...prevState, [data]: text }));
  };
  const handleError = (errorMessage, data) => {
    setErrors((prevState) => ({ ...prevState, [data]: errorMessage }));
  };

  return (
    <SafeAreaView>
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
            Create an account
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 18,
              maxWidth: "95%",
              textAlign: "center",
            }}
          >
            Join the pack and create your account to start your jorney towards
            finding your furry soulmate!
          </Text>
        </View>
        <View
          style={{
            marginVertical: 10,
          }}
        >
          <CustomInput
            placeholder="Email"
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
            Sign up
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
            Already have an account
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
            Or continue with
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
    </SafeAreaView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
//done
