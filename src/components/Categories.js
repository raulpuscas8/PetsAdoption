import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import Card from "./Card";
import COLORS from "../const/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const { height } = Dimensions.get("window");

const Categories = ({ list, navigation }) => {
  //console.log(list);

  return (
    <>
      <FlatList
        data={list} // sa pun aici top
        vertical
        decelerationRate="normal"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(items) => items.name}
        renderItem={({ item, index }) => {
          if (item.animalType.includes("Pisica")) {
            return (
              <SafeAreaView>
                <Card list={item} />
              </SafeAreaView>
            );
          }
          if (item.animalType.includes("Caine")) {
            return (
              <SafeAreaView>
                <Card list={item} />
              </SafeAreaView>
            );
          }
          if (item.animalType.includes("Pasare")) {
            return (
              <SafeAreaView>
                <Card list={item} />
              </SafeAreaView>
            );
          }
          if (item.animalType.includes("Iepure")) {
            return (
              <SafeAreaView>
                <Card list={item} />
              </SafeAreaView>
            );
          }
        }}
      />
    </>
  );
};

export default Categories;

// const styles = StyleSheet.create({});
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
