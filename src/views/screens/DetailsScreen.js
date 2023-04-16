import React from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import COLORS from "../../const/colors";

const DetailsScreen = ({ navigation, route }) => {
  const pet = route.params;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
      <StatusBar backgroundColor={COLORS.background} />
      <View style={{ height: 400, backgroundColor: COLORS.nude }}>
        <ImageBackground
          source={pet?.image}
          resizeMode="contain"
          style={{ height: 280, top: 20 }}
        >
          <View style={style.header}>
            <MaterialCommunityIcons
              name="arrow-left"
              size={28}
              color={COLORS.dark}
              onPress={navigation.goBack}
            />
            <MaterialCommunityIcons
              name="dots-vertical"
              size={28}
              color={COLORS.dark}
            />
          </View>
        </ImageBackground>
        <View style={style.detailsContainer}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{ fontSize: 20, color: COLORS.dark, fontWeight: "bold" }}
            >
              {pet?.name}
            </Text>
            <MaterialCommunityIcons
              name="gender-male"
              size={25}
              color={COLORS.grey}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 5,
            }}
          >
            <Text style={{ fontSize: 12, color: COLORS.dark }}>
              {pet?.type}
            </Text>
            <Text style={{ fontSize: 13, color: COLORS.dark }}>{pet?.age}</Text>
          </View>
          <View style={{ marginTop: 5, flexDirection: "row" }}>
            <MaterialCommunityIcons
              name="map-marker"
              size={20}
              color={COLORS.primary}
            />
            <Text style={{ fontSize: 13, color: COLORS.grey, marginLeft: 10 }}>
              {pet?.location}
            </Text>
          </View>
        </View>
      </View>
      <View style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}>
        <View>
          <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
            <Image
              source={require("../../assets/person.jpg")}
              style={{ height: 50, width: 50, borderRadius: 25 }}
            />
            <View style={{ flex: 1, paddingLeft: 10, height: 20 }}>
              <Text
                style={{ color: COLORS.dark, fontSize: 12, fontWeight: "bold" }}
              >
                Raul Puscas
              </Text>
              <Text
                style={{
                  color: COLORS.grey,
                  fontSize: 11,
                  fontWeight: "bold",
                  marginTop: 2,
                }}
              >
                Owner
              </Text>
            </View>
            <Text style={{ color: COLORS.grey, fontSize: 12 }}>
              16 April 2023
            </Text>
          </View>
          <Text style={style.comment}>
            I am currently in the process of moving and unfortunately, I cannot
            bring my beloved pet with me. As a result, I am searching for a good
            home and loving people who can take care of it.
          </Text>
        </View>
        <View style={style.footer}>
          <View style={style.IconContainer}>
            <MaterialCommunityIcons
              name="heart-outline"
              size={22}
              color={COLORS.white}
            />
          </View>
          <View style={style.btn}>
            <Text
              style={{
                color: COLORS.white,
                fontWeight: "bold",
                justifyContent: "center",
              }}
            >
              ADOPTION
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  btn: {
    backgroundColor: COLORS.primary,
    flex: 1,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    height: 100,
    backgroundColor: COLORS.lightgrey,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  IconContainer: {
    backgroundColor: COLORS.primary,
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  comment: {
    marginTop: 10,
    fontSize: 12.5,
    color: COLORS.dark,
    lineHeight: 20,
    marginHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  detailsContainer: {
    height: 120,
    flex: 1,
    backgroundColor: COLORS.lightgrey,
    padding: 20,
    marginHorizontal: 20,
    bottom: -60,
    elevation: 10,
    borderRadius: 18,
    justifyContent: "center",
  },
});
export default DetailsScreen;
