import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
//import OnBoardScreen from "./src/navigation/screens/OnBoardScreen";
//import HomeScreen from "./src/views/screens/HomeScreen";
import DetailsScreen from "./src/views/screens/DetailsScreen";
import DrawerNavigator from "./src/views/navigators/DrawerNavigator";
const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
