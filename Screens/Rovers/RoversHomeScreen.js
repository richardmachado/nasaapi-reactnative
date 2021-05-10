import React from "react";
import { View, Button, Image } from "react-native";

export default function RoversHomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image
        style={{ width: 375, height: 325 }}
        source={{
          uri: "https://mars.nasa.gov/layout/mars2020/images/PIA23764-RoverNamePlateonMars-web.jpg",
        }}
      />
      <View>
        <Button
          title="Curiosity"
          onPress={() => navigation.navigate("Curiosity")}
        />
      </View>
      <View>
        <Button
          title="Opportunity"
          onPress={() => navigation.navigate("Opportunity")}
        />
      </View>
      <View>
        <Button title="Spirit" onPress={() => navigation.navigate("Spirit")} />
      </View>
      <View>
        <Button
          title="Perserverance"
          onPress={() => navigation.navigate("Perserverance")}
        />
      </View>
    </View>
  );
}
