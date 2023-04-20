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
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import CustomInput from "../Input/CustomInput";
import { firebase } from "../../../firebase";

const Donation = ({ navigation }) => {
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
            paddingTop: 50,
          }}
        >
          <Text
            style={{
              paddingTop: 40,
              fontSize: 25,
              color: COLORS.black,
              fontWeight: "bold",
              marginVertical: 10,
              textAlign: "center",
            }}
          >
            Vă mulțumim că ați luat în considerare o donație către PetsAdoption.
          </Text>
          <Text
            style={{
              paddingTop: 50,
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
              color: COLORS.primary,
            }}
          >
            Generozitatea ta ne va ajuta să ne continuăm misiunea de a gasi un
            stăpân pentru fiecare suflet. contribuție.
          </Text>
          <Text
            style={{
              padding: 30,
              fontWeight: "bold",
              fontSize: 18,
              textAlign: "center",
              color: COLORS.dark,
            }}
          >
            Vă rugăm să introduceți suma pe care trebuie să o donați în caseta
            de mai jos. Toate donațiile sunt deductibile fiscale în cea mai mare
            măsură permisă de lege. Apreciem foarte mult sprijinul dumneavoastră
            și vă mulțumim pentru contribuție.
          </Text>
        </View>
        <View
          style={{
            padding: 20,
            paddingStart: 20,
          }}
        >
          <CustomInput
            placeholder="Sumă"
            placeholderTextColor={COLORS.dark}
            style={{
              fontWeight: "bold",
              fontSize: 14,
              padding: 20,
              backgroundColor: COLORS.nude,
              borderRadius: 10,
              marginVertical: 10,
            }}
          />
        </View>
        <TouchableOpacity
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
            Donează
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 44,
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

export default Donation;

const styles = StyleSheet.create({});
