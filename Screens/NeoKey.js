import React from "react";
import {View, Text} from 'react-native'

export default function NEOKey() {
  return (
    <View style={{ height:150 }} className="my-3">
      <Text>
        <Text className="px-4 mr-2 bg-success" /> = Safe Asteroid
      </Text>
      <Text>
        <Text className="px-4 mr-2 bg-danger" /> = Potentially Dangerous
        Asteroid
      </Text>
    </View>
  );
}