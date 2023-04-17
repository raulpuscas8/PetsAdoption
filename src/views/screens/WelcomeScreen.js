import {
  Dimensions,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import COLORS from "../../const/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
const { height } = Dimensions.get("window");

const WelcomeScreen = ({ loginscreen, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      <View>
        <ImageBackground
          style={{
            height: height / 2.1,
          }}
          resizeMode="contain"
          source={require("../../assets/Welcome.jpg")}
        />
        <View
          style={{
            paddingHorizontal: 10,
            paddingTop: 40,
          }}
        >
          <Text
            style={{
              fontSize: 35,
              color: COLORS.primary,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            Pawsitive Adoptions
          </Text>

          <Text
            style={{
              fontSize: 20,
              color: COLORS.dark,
              fontWeight: "bold",
              textAlign: "center",
              marginTop: 60,
            }}
          >
            Adopt your new best friend today - they're waiting for you on our
            app!
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: 30,
            paddingVertical: 40,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("LoginScreen", loginscreen)}
            style={{
              backgroundColor: COLORS.primary,
              paddingVertical: 15,
              paddingHorizontal: 50,
              width: "70%",
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: COLORS.white,
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Welcome
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default WelcomeScreen;
