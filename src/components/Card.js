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
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import COLORS from "../const/colors";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import DetailsScreen from "../views/screens/DetailsScreen";
const { height } = Dimensions.get("window");

const Card = ({ navigation, list }) => {
  // console.log(list.animalType);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => navigation.navigate("DetailsScreen", { list: list })}
    >
      <View style={style.cardContainer}>
        <View style={style.cardImageContainer}>
          <Image
            source={{ uri: list.image }}
            style={{ width: "100%", height: "100%", borderRadius: 20 }}
          />
        </View>
        <View style={style.cardDetailsContainer}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text>{list.name}</Text>
            {list?.sex.includes("Femela") ? (
              <Ionicons name="female" size={22} color={COLORS.grey} />
            ) : (
              <Ionicons name="male" size={22} color={COLORS.grey} />
            )}
          </View>
          <Text style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}>
            <Text>{list.animalType}</Text>
          </Text>
          {/*  list.age e de tip string si cu "parseInt()" il convertim in "int" ca sa putem verifica daca varsta e egala cu 1 */}
          {parseInt(list.age) === 1 ? (
            <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
              <Text>{list.age} an</Text>
            </Text>
          ) : (
            // daca varsta nu e "1" atunci ne afiseaza "ani" in loc de "an"
            <Text style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}>
              <Text>{list.age} ani</Text>
            </Text>
          )}
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
              <Text>{list.location}</Text>
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default Card;

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
