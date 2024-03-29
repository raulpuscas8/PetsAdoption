import React, { useState, useEffect, useCallback } from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  useDrawerProgress,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Image, View, Text, Animated, StatusBar } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import COLORS from "../../const/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SettingsScreen from "../screens/SettingsScreen";
import { firebase } from "../../../firebase";
import AddPet from "../screens/AddPet";
import Favorite from "../screens/Favorite";
import Donation from "../screens/Donation";
import { getImageURL } from "../../data/Database";
import { useFocusEffect } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const [username, setUsername] = useState("");
  const [userPhoto, setUserPhoto] = useState();
  useEffect(() => {
    const userEmail = firebase.auth().currentUser.email;
    firebase
      .firestore()
      .collection("users")
      .doc(userEmail)
      .get()
      .then((item) => {
        if (item.exists) {
          setUsername(item.data().username);
        } else {
          console.log("User data not found");
        }
      })
      .catch((error) => {
        console.log("Error getting user data: ", error);
      });
  }, []);

  const [photoKey, setPhotoKey] = useState(0);

  useEffect(() => {
    async function getUsersImage() {
      const currentUserEmail = firebase.auth().currentUser.email;
      const imagePath = `users/${currentUserEmail}.jpeg`;
      const responseImage = await getImageURL(imagePath);
      setUserPhoto(responseImage);
    }
    getUsersImage();
    const interval = setInterval(() => {
      getUsersImage();
    }, 10);
    return () => clearInterval(interval);
  }, []);

  return (
    <DrawerContentScrollView style={{ paddingVertical: 30 }}>
      <View style={{ marginLeft: 20, marginVertical: 40 }}>
        <Image
          key={photoKey}
          source={{ uri: userPhoto }}
          style={{ height: 80, width: 80, borderRadius: 30 }}
        />
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            fontSize: 16,
            marginTop: 10,
            marginLeft: 1,
          }}
        >
          {username}
        </Text>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const DrawerScreenContainer = ({ children }) => {
  const isDrawerOpen = useDrawerStatus();
  return (
    <Animated.View
      style={{ backgroundColor: COLORS.white, flex: 1, overflow: "hidden" }}
    >
      <StatusBar
        barStyle="dark-content"
        backgroundColor={isDrawerOpen == "open" ? COLORS.primary : COLORS.white}
      />
      {children}
    </Animated.View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          width: 200,
          backgroundColor: COLORS.primary,
        },
        overlayColor: null,
        sceneContainerStyle: {
          backgroundColor: COLORS.primary,
        },
        drawerActiveTintColor: COLORS.white,
        drawerInactiveTintColor: COLORS.nude,
        drawerItemStyle: { backgroundColor: null },
        drawerLabelStyle: {
          fontWeight: "bold",
        },
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Home"
        options={{
          title: "ACASĂ",
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="paw"
              size={25}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="DONAȚIE"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="gift"
              size={25}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
        component={Donation}
      ></Drawer.Screen>

      <Drawer.Screen
        name="ANUNȚ"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="plus-box"
              size={25}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
        component={AddPet}
      ></Drawer.Screen>

      <Drawer.Screen
        name="FAVORITE"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="heart"
              size={25}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
        component={Favorite}
      ></Drawer.Screen>
      <Drawer.Screen
        name="PROFIL"
        options={{
          drawerIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="account"
              size={25}
              color={color}
              style={{ marginRight: -20 }}
            />
          ),
        }}
        component={SettingsScreen}
      ></Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
