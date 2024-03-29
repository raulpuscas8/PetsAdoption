import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import DrawerNavigator from "./src/views/navigators/DrawerNavigator";
import LoginScreen from "./src/views/screens/LoginScreen";
import HomeScreen from "./src/views/screens/HomeScreen";
import SettingsScreen from "./src/views/screens/SettingsScreen";
import WelcomeScreen from "./src/views/screens/WelcomeScreen";
import RegisterScreen from "./src/views/screens/RegisterScreen";
import { firebase } from "./firebase";
import UserContextProvider from "./src/context/AuthContext";
import { FavouritesContextProvider } from "./src/service/favourites/favourites.context";
import AdminNavigator from "./src/views/navigators/AdminNavigator";
import CameraScreen from "./src/views/screens/CameraScreen";

const Stack = createNativeStackNavigator();

LogBox.ignoreAllLogs();

const App = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  return (
    <FavouritesContextProvider>
      <UserContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
            <Stack.Screen name="AdminScreen" component={AdminNavigator} />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            <Stack.Screen name="CameraScreen" component={CameraScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </UserContextProvider>
    </FavouritesContextProvider>
  );
};

export default App;
