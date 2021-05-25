import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./Screens/HomeScreen";
import POTD from "./Screens/POTD";
import NEO from "./Screens/NEO";

import RoversHomeScreen from "./Screens/Rovers/RoversHomeScreen";
import Spirit from "./Screens/Rovers/Spirit";
import Curiosity from "./Screens/Rovers/Curiosity";
import Opportunity from "./Screens/Rovers/Opportunity";
import Perserverance from "./Screens/Rovers/Perserverance";

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Near Earth Objects">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="POTD" component={POTD} />
        <Stack.Screen name="Near Earth Objects" component={NEO} />

        <Stack.Screen name="RoversHomeScreen" component={RoversHomeScreen} />
        <Stack.Screen name="Spirit Rover" component={Spirit} />
        <Stack.Screen name="Curiosity Rover" component={Curiosity} />
        <Stack.Screen name="Opportunity Rover" component={Opportunity} />
        <Stack.Screen name="Perserverance Rover" component={Perserverance} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
