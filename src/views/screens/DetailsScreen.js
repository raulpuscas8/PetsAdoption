import React, { useContext, useState, useEffect, useRef } from "react";
import {
  ImageBackground,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Share,
  TouchableOpacity,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Feather, Ionicons } from "@expo/vector-icons";
import COLORS from "../../const/colors";
import { format } from "date-fns";
import { Favorite } from "../../components/favourite.component";
import { FavouritesContext } from "../../service/favourites/favourites.context";
import { ScrollView } from "react-native-gesture-handler";

const DetailsScreen = ({ navigation, route }) => {
  const { list } = route.params;
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  const isFavourite = favourites.find((r) => r.name === list.name);
  const [isToggled, setIsToggled] = useState(false);
  const handleIntrebare = () => {};

  return (
    <SafeAreaView
      style={{ marginTop: -60, flex: 1, backgroundColor: COLORS.white }}
    >
      {list.animalType === "Pisica" && (
        <>
          <StatusBar backgroundColor={COLORS.background} />
          <View style={{ height: 420, backgroundColor: COLORS.nude }}>
            <View style={style.header}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={COLORS.dark}
                onPress={navigation.goBack}
              />
              <View style={{ marginLeft: 340, flex: 1 }}>
                <Feather
                  onPress={() => {
                    Share.share({
                      url: "https://www.facebook.com/raul.ioan.1/",
                      title: "Pawsitive Adoption",
                    });
                  }}
                  name="share"
                  size={28}
                  color={COLORS.dark}
                />
              </View>
            </View>
            <View
              style={{
                height: 325,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ScrollView
                style={{ height: 500 }}
                contentContainerStyle={{}}
                ref={(scrollView) => {
                  _scrollView = scrollView;
                }}
                horizontal={true}
                pagingEnabled={true}
              >
                <ImageBackground
                  source={{ uri: list?.image }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image1 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image2 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
              </ScrollView>
            </View>
            <View style={style.detailsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.dark,
                    fontWeight: "bold",
                  }}
                >
                  {list?.name}
                </Text>
                {list?.sex.includes("Femela") ? (
                  <Ionicons name="female" size={22} color={COLORS.grey} />
                ) : (
                  <Ionicons name="male" size={22} color={COLORS.grey} />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 12, color: COLORS.dark }}>
                  {list?.breed}
                </Text>
                {parseInt(list.age) === 1 ? (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} an</Text>
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} ani</Text>
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={COLORS.primary}
                />
                <Text
                  style={{ fontSize: 13, color: COLORS.grey, marginLeft: 10 }}
                >
                  {list?.localitate}, jud.{list?.judet}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}
          >
            <View>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                <Image
                  source={require("../../assets/person.jpg")}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
                <View style={{ flex: 1, paddingLeft: 10, height: 20 }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {list?.userName}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    Proprietar
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    {list?.email}
                  </Text>
                </View>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {new Date(list?.addedOn * 1000)
                    .toLocaleString("ro-RO", {
                      timeZone: "Europe/Bucharest",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/\b\w/g, function (c) {
                      return c.toLocaleUpperCase();
                    })}
                </Text>
              </View>
              <Text style={style.comment}>{list?.description}</Text>
            </View>

            <View style={style.footer}>
              <View style={style.IconContainer}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 9,
                  }}
                  onPress={() =>
                    !isFavourite
                      ? addToFavourites(list)
                      : removeFromFavourites(list)
                  }
                >
                  <MaterialCommunityIcons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavourite ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={style.btn}
                onPress={() => Linking.openURL(`tel:${list.telefon}`)}
              >
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                  >
                    ADOPTĂ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {list.animalType === "Caine" && (
        <>
          <StatusBar backgroundColor={COLORS.background} />
          <View style={{ height: 420, backgroundColor: COLORS.nude }}>
            <View style={style.header}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={COLORS.dark}
                onPress={navigation.goBack}
              />
              <View style={{ marginLeft: 340, flex: 1 }}>
                <Feather
                  onPress={() => {
                    Share.share({
                      url: "https://www.facebook.com/raul.ioan.1/",
                      title: "Pawsitive Adoption",
                    });
                  }}
                  name="share"
                  size={28}
                  color={COLORS.dark}
                />
              </View>
            </View>
            <View
              style={{
                height: 325,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ScrollView
                style={{ height: 500 }}
                contentContainerStyle={{ height: "100%" }}
                ref={(scrollView) => {
                  _scrollView = scrollView;
                }}
                horizontal={true}
                pagingEnabled={true}
              >
                <ImageBackground
                  source={{ uri: list?.image }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image1 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image2 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
              </ScrollView>
            </View>
            <View style={style.detailsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.dark,
                    fontWeight: "bold",
                  }}
                >
                  {list?.name}
                </Text>
                {list?.sex.includes("Femela") ? (
                  <Ionicons name="female" size={22} color={COLORS.grey} />
                ) : (
                  <Ionicons name="male" size={22} color={COLORS.grey} />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 12, color: COLORS.dark }}>
                  {list?.breed}
                </Text>
                {parseInt(list.age) === 1 ? (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} an</Text>
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} ani</Text>
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={COLORS.primary}
                />
                <Text
                  style={{ fontSize: 13, color: COLORS.grey, marginLeft: 10 }}
                >
                  {list?.localitate}, jud.{list?.judet}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}
          >
            <View>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                <Image
                  source={require("../../assets/person.jpg")}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
                <View style={{ flex: 1, paddingLeft: 10, height: 20 }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {list?.userName}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    Proprietar
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    {list?.email}
                  </Text>
                </View>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {new Date(list?.addedOn * 1000)
                    .toLocaleString("ro-RO", {
                      timeZone: "Europe/Bucharest",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/\b\w/g, function (c) {
                      return c.toLocaleUpperCase();
                    })}
                </Text>
              </View>
              <Text style={style.comment}>{list?.description}</Text>
            </View>

            <View style={style.footer}>
              <View style={style.IconContainer}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 9,
                  }}
                  onPress={() =>
                    !isFavourite
                      ? addToFavourites(list)
                      : removeFromFavourites(list)
                  }
                >
                  <MaterialCommunityIcons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavourite ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={style.btn}
                onPress={() => Linking.openURL(`tel:${list.telefon}`)}
              >
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                  >
                    ADOPTĂ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {list.animalType === "Pasare" && (
        <>
          <StatusBar backgroundColor={COLORS.background} />
          <View style={{ height: 420, backgroundColor: COLORS.nude }}>
            <View style={style.header}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={COLORS.dark}
                onPress={navigation.goBack}
              />
              <View style={{ marginLeft: 340, flex: 1 }}>
                <Feather
                  onPress={() => {
                    Share.share({
                      url: "https://www.facebook.com/raul.ioan.1/",
                      title: "Pawsitive Adoption",
                    });
                  }}
                  name="share"
                  size={28}
                  color={COLORS.dark}
                />
              </View>
            </View>
            <View
              style={{
                height: 325,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ScrollView
                style={{ height: 500 }}
                contentContainerStyle={{ height: "100%" }}
                ref={(scrollView) => {
                  _scrollView = scrollView;
                }}
                horizontal={true}
                pagingEnabled={true}
              >
                <ImageBackground
                  source={{ uri: list?.image }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image1 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image2 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
              </ScrollView>
            </View>
            <View style={style.detailsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.dark,
                    fontWeight: "bold",
                  }}
                >
                  {list?.name}
                </Text>
                {list?.sex.includes("Femela") ? (
                  <Ionicons name="female" size={22} color={COLORS.grey} />
                ) : (
                  <Ionicons name="male" size={22} color={COLORS.grey} />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 12, color: COLORS.dark }}>
                  {list?.breed}
                </Text>
                {parseInt(list.age) === 1 ? (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} an</Text>
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} ani</Text>
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={COLORS.primary}
                />
                <Text
                  style={{ fontSize: 13, color: COLORS.grey, marginLeft: 10 }}
                >
                  {list?.localitate}, jud.{list?.judet}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}
          >
            <View>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                <Image
                  source={require("../../assets/person.jpg")}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
                <View style={{ flex: 1, paddingLeft: 10, height: 20 }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {list?.userName}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    Proprietar
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    {list?.email}
                  </Text>
                </View>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {new Date(list?.addedOn * 1000)
                    .toLocaleString("ro-RO", {
                      timeZone: "Europe/Bucharest",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/\b\w/g, function (c) {
                      return c.toLocaleUpperCase();
                    })}
                </Text>
              </View>
              <Text style={style.comment}>{list?.description}</Text>
            </View>
            <View style={style.footer}>
              <View style={style.IconContainer}>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 9,
                  }}
                  onPress={() =>
                    !isFavourite
                      ? addToFavourites(list)
                      : removeFromFavourites(list)
                  }
                >
                  <MaterialCommunityIcons
                    name={isFavourite ? "heart" : "heart-outline"}
                    size={24}
                    color={isFavourite ? "red" : "white"}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={style.btn}
                onPress={() => Linking.openURL(`tel:${list.telefon}`)}
              >
                <View>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontWeight: "bold",
                      justifyContent: "center",
                    }}
                  >
                    ADOPTĂ
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}

      {list.animalType === "Iepure" && (
        <>
          <StatusBar backgroundColor={COLORS.background} />
          <View style={{ height: 420, backgroundColor: COLORS.nude }}>
            <View style={style.header}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={28}
                color={COLORS.dark}
                onPress={navigation.goBack}
              />
              <View style={{ marginLeft: 340, flex: 1 }}>
                <Feather
                  onPress={() => {
                    Share.share({
                      url: "https://www.facebook.com/raul.ioan.1/",
                      title: "Pawsitive Adoption",
                    });
                  }}
                  name="share"
                  size={28}
                  color={COLORS.dark}
                />
              </View>
            </View>
            <View
              style={{
                height: 325,
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <ScrollView
                style={{ height: 500 }}
                contentContainerStyle={{ height: "100%" }}
                ref={(scrollView) => {
                  _scrollView = scrollView;
                }}
                horizontal={true}
                pagingEnabled={true}
              >
                <ImageBackground
                  source={{ uri: list?.image }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 0, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image1 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 225, top: 0, borderRadius: 25 }}
                ></ImageBackground>
                <ImageBackground
                  source={{ uri: list?.image2 }}
                  resizeMode="contain"
                  style={{ height: 300, width: 300, top: 20, borderRadius: 25 }}
                ></ImageBackground>
              </ScrollView>
            </View>
            <View style={style.detailsContainer}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    color: COLORS.dark,
                    fontWeight: "bold",
                  }}
                >
                  {list?.name}
                </Text>
                {list?.sex.includes("Femela") ? (
                  <Ionicons name="female" size={22} color={COLORS.grey} />
                ) : (
                  <Ionicons name="male" size={22} color={COLORS.grey} />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontSize: 12, color: COLORS.dark }}>
                  {list?.breed}
                </Text>
                {parseInt(list.age) === 1 ? (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} an</Text>
                  </Text>
                ) : (
                  <Text style={{ fontSize: 13, color: COLORS.dark }}>
                    <Text>{list.age} ani</Text>
                  </Text>
                )}
              </View>
              <View style={{ marginTop: 5, flexDirection: "row" }}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={20}
                  color={COLORS.primary}
                />
                <Text
                  style={{ fontSize: 13, color: COLORS.grey, marginLeft: 10 }}
                >
                  {list?.localitate}, jud.{list?.judet}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{ marginTop: 80, justifyContent: "space-between", flex: 1 }}
          >
            <View>
              <View style={{ flexDirection: "row", paddingHorizontal: 20 }}>
                <Image
                  source={require("../../assets/person.jpg")}
                  style={{ height: 50, width: 50, borderRadius: 25 }}
                />
                <View style={{ flex: 1, paddingLeft: 10, height: 20 }}>
                  <Text
                    style={{
                      color: COLORS.dark,
                      fontSize: 12,
                      fontWeight: "bold",
                    }}
                  >
                    {list?.userName}
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    Proprietar
                  </Text>
                  <Text
                    style={{
                      color: COLORS.grey,
                      fontSize: 11,
                      fontWeight: "bold",
                      marginTop: 2,
                    }}
                  >
                    {list?.email}
                  </Text>
                </View>
                <Text style={{ color: COLORS.grey, fontSize: 12 }}>
                  {new Date(list?.addedOn * 1000)
                    .toLocaleString("ro-RO", {
                      timeZone: "Europe/Bucharest",
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                    .replace(/\b\w/g, function (c) {
                      return c.toLocaleUpperCase();
                    })}
                </Text>
              </View>
              <Text style={style.comment}>{list?.description}</Text>
            </View>
            <View style={{ borderWidth: 10, borderColor: COLORS.white }}>
              <View style={style.footer}>
                <View style={style.IconContainer}>
                  <TouchableOpacity
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      zIndex: 9,
                    }}
                    onPress={() =>
                      !isFavourite
                        ? addToFavourites(list)
                        : removeFromFavourites(list)
                    }
                  >
                    <MaterialCommunityIcons
                      name={isFavourite ? "heart" : "heart-outline"}
                      size={24}
                      color={isFavourite ? "red" : "white"}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={style.btn}
                  onPress={() => Linking.openURL(`tel:${list.telefon}`)}
                >
                  <View>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontWeight: "bold",
                        justifyContent: "center",
                      }}
                    >
                      ADOPTĂ
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </>
      )}
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
    top: 35,
    height: 120,
    backgroundColor: COLORS.lightgrey,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    justifyContent: "flex-end",
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
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  detailsContainer: {
    backgroundColor: COLORS.lightgrey,
    padding: 20,
    marginHorizontal: 20,
    bottom: 44,
    borderRadius: 18,
    justifyContent: "center",
    height: 90,
  },
});
export default DetailsScreen;
