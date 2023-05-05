import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Keyboard,
  SafeAreaView,
} from "react-native";
import CustomInput from "../Input/CustomInput";
import COLORS from "../../const/colors";
import { firebase } from "../../../firebase";
import { UserContext } from "../../context/AuthContext";
import { useContext } from "react";

const LoginScreen = ({ navigation }) => {
  const [errors, setErrors] = useState({});
  const [errorLogin, setErrorLogin] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const firebaseError1 =
    "Firebase: There is no user record corresponding to this identifier. The user may have been deleted. (auth/user-not-found).";
  const firebaseError2 =
    "Firebase: The password is invalid or the user does not have a password. (auth/wrong-password).";
  const authenticatedUser = useContext(UserContext);

  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!data.email) {
      handleError("Vă rugăm, introduceți un email.", "email");
      valid = false;
    } else if (!data.email.match(/\S+@\S+\.\S+/)) {
      handleError("Vă rugăm, introduceți un email valid", "email");
      valid = false;
    }

    //password
    if (!data.password) {
      handleError("Vă rugăm, introduceți o parolă.", "password");
      valid = false;
    } else if (data.password.length < 8) {
      handleError(
        "Parola trebuie să fie de cel puțin 8 caractere.",
        "password"
      );
      valid = false;
    }

    // if (valid) {
    //   handleLogin(data.email, data.password);
    // }
  };

  const handleLogin = async (email, password) => {
    try {
      // const user = await firebase
      //   .auth()
      //   .signInWithEmailAndPassword(email, password);
      // const id = user.user.uid;
      // authenticatedUser.getUserId(id);
      // console.log(authenticatedUser.uid);
      // //navigation.navigate("Home1");
      const { user } = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      const userDoc = await firebase
        .firestore()
        .collection("admins")
        .doc(user.email)
        .get();

      console.log("user.uid", user.email);
      console.log("userDoc.exists", userDoc.exists);

      if (userDoc.exists == true) {
        console.log("Admin");
        navigation.navigate("AdminScreen");
      } else {
        console.log("Utilizator");
        navigation.navigate("HomeScreen"); //utilizatori
      }
    } catch (error) {
      console.log(error.message);
      validate();
      if (error.message === firebaseError1) {
        setErrorLogin(
          "Acest cont nu există! Verificați email-ul și parola introduse sau creați un cont! "
        );
      } else if (error.message === firebaseError2) {
        setErrorLogin(
          "Parola este incorectă! Verificați-o și încercați din nou!"
        );
      } else {
        setErrorLogin("");
      }
    }
  };
  const handleOnChange = (text, data) => {
    setData((prevState) => ({ ...prevState, [data]: text }));
  };

  // input din () reprezinta input-ul (email, password, fullname) unde vrem sa afisam mesajul de eroare erroMessage
  const handleError = (errorMessage, data) => {
    setErrors((prevState) => ({ ...prevState, [data]: errorMessage }));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.lightorange }}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingTop: 50,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            color: COLORS.primary,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Să facem diferența în viața unui animal de companie!
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: COLORS.dark,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 50,
          }}
        >
          Vă rugăm să vă conectați pentru a vă accesa contul
        </Text>
      </View>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={styles.inputContainer}>
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
          <View>
            {errorLogin ? (
              <Text style={styles.textErrorLogin}>{errorLogin}</Text>
            ) : null}
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              handleLogin(data.email, data.password);
            }}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Autentificare</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("RegisterScreen");
            }}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Înregistrează-te</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "#FFE5D2",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    backgroundColor: "#FF8B3D",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#FF8B3D",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#FF8B3D",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginScreen;
