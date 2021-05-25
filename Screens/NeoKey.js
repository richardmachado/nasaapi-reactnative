import React from "react";
import { View, Text } from "react-native";

export default function NEOKey() {
  return (
    <View style={{ height: 150 }} className="my-3">
      <Text style={{ backgroundColor: "lightblue" }}>
        <Text /> = Safe Asteroid
      </Text>
      <Text style={{ backgroundColor: "pink" }}>
        <Text /> = Potentially Dangerous Asteroid
      </Text>
    </View>
  );
}
