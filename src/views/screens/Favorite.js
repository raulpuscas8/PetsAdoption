import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { FavouritesContext } from "../../service/favourites/favourites.context";
import COLORS from "../../const/colors";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
const { height } = Dimensions.get("window");

const Favorite = ({ navigation }) => {
  const { favourites, addToFavourites, removeFromFavourites } =
    useContext(FavouritesContext);
  console.log(favourites);
  return (
    <ScrollView
      contentContainerStyle={style.scrollViewContent}
      style={{ backgroundColor: COLORS.beige }}
    >
      <SafeAreaView style={style.container}>
        <View style={{ padding: 5 }}>
          <MaterialCommunityIcons
            name="arrow-left"
            size={25}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
        </View>
        <View
          style={{
            padding: 10,
            backgroundColor: COLORS.beige,
          }}
        >
          <View
            style={{
              alignItems: "center",
              marginTop: -20,
            }}
          >
            <Text
              style={{
                padding: 10,
                fontSize: 30,
                color: COLORS.primary,
                fontWeight: "bold",
                marginVertical: 10,
                textAlign: "center",
              }}
            >
              Anunțurile favorite
            </Text>
            <Text
              style={{
                padding: 10,
                fontWeight: "bold",
                fontSize: 18,
                maxWidth: "95%",
                textAlign: "center",
                color: COLORS.white,
              }}
            >
              Care o să fie următorul membru al familiei?
            </Text>
          </View>

          {favourites.map((fav, index) => {
            console.log(fav.name);
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  navigation.navigate("DetailsScreen", { list: fav })
                }
              >
                <View key={index} style={style.cardContainer}>
                  <View style={style.cardImageContainer}>
                    <Image
                      source={{ uri: fav.image }}
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: 20,
                      }}
                    />
                  </View>
                  <View style={style.cardDetailsContainer}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text>{fav.name}</Text>
                      {fav.sex.includes("Femela") ? (
                        <Ionicons name="female" size={22} color={COLORS.grey} />
                      ) : (
                        <Ionicons name="male" size={22} color={COLORS.grey} />
                      )}
                    </View>
                    <Text
                      style={{ fontSize: 12, marginTop: 5, color: COLORS.dark }}
                    >
                      <Text>{fav.animalType}</Text>
                    </Text>
                    <Text
                      style={{ fontSize: 10, marginTop: 5, color: COLORS.grey }}
                    >
                      {parseInt(fav.age) === 1 ? (
                        <Text
                          style={{
                            fontSize: 10,
                            marginTop: 5,
                            color: COLORS.grey,
                          }}
                        >
                          <Text>{fav.age} an</Text>
                        </Text>
                      ) : (
                        <Text
                          style={{
                            fontSize: 10,
                            marginTop: 5,
                            color: COLORS.grey,
                          }}
                        >
                          <Text>{fav.age} ani</Text>
                        </Text>
                      )}
                    </Text>
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
                        <Text>
                          {fav.localitate}, jud.{fav.judet}
                        </Text>
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default Favorite;

const style = StyleSheet.create({
  container: {
    padding: 10,
    paddingVertical: 1,
    backgroundColor: COLORS.beige,
  },
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
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
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
