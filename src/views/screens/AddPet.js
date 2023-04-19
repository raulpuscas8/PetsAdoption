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

const AddPet = ({ navigation }) => {
  return (
    <SafeAreaView>
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
        <View
          style={{
            marginVertical: 10,
          }}
        >
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
          />
          <CustomInput
            placeholder="Adresă"
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
            Adauga
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            padding: 20,
          }}
        >
          <Text
            onPress={() => navigation.navigate("HomeScreen")}
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
      </View>
    </SafeAreaView>
  );
};

export default AddPet;

const styles = StyleSheet.create({});
