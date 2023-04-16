import React from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../const/colors";
const { height } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, color: COLORS.white }}>
      <View style={style.header}>
        <MaterialCommunityIcons
          name="sort-variant"
          size={28}
          onPress={navigation.toggleDrawer}
        />
        <Text
          style={{ color: COLORS.primary, fontWeight: "bold", fontSize: 16 }}
        >
          Raul Puscas
        </Text>
        <Image
          source={require("../../assets/person.jpg")}
          style={{ height: 30, width: 30, borderRadius: 15 }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={style.mainContainer}></View>
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  header: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainContainer: {
    minHeight: height,
  },
});
export default HomeScreen;
