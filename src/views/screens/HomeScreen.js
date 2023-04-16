import React from "react";
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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../const/colors";
import { TouchableOpacity } from "react-native-gesture-handler";
const { height } = Dimensions.get("window");
const petCategores = [
  { name: "CATS", icon: "cat" },
  { name: "DOGS", icon: "dog" },
  { name: "BIRDS", icon: "bird" },
  { name: "BUNNIES", icon: "rabbit" },
];

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
        <View style={style.mainContainer}>
          <View style={style.searchInputContainer}>
            <MaterialCommunityIcons
              name="magnify"
              size={24}
              color={COLORS.grey}
            />
            <TextInput
              placeholder="Search pet to adopt"
              style={{ flex: 1 }}
              placeholderTextColor={COLORS.grey}
            />
            <MaterialCommunityIcons
              name="sort-ascending"
              size={24}
              color={COLORS.grey}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            {petCategores.map((item, index) => (
              <View key={"pet" + index} style={{ alignItems: "center" }}>
                <TouchableOpacity style={[style.categoryBtn]}>
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={30}
                    color={COLORS.white}
                  />
                </TouchableOpacity>
                <Text style={style.categoryBtnName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>
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
    backgroundColor: COLORS.light,
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
export default HomeScreen;
