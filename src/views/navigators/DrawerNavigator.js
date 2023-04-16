import React from "react";
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

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  return (
    <DrawerContentScrollView style={{ paddingVertical: 30 }}>
      <View style={{ marginLeft: 20, marginVertical: 40 }}>
        <Image
          source={require("../../assets/person.jpg")}
          style={{ height: 70, width: 70, borderRadius: 20 }}
        />
        <Text
          style={{
            color: COLORS.white,
            fontWeight: "bold",
            fontSize: 13,
            marginTop: 10,
          }}
        >
          Raul Puscas
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
          title: "ADOPTION",
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
        name="DONATION"
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
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="ADD PET"
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
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="FAVORITES"
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
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>

      <Drawer.Screen
        name="PROFILE"
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
      >
        {(props) => (
          <DrawerScreenContainer>
            <HomeScreen {...props} />
          </DrawerScreenContainer>
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
