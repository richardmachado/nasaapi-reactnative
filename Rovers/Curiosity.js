import React, { useState, useEffect } from "react";
import axios from 'axios';
import { StyleSheet,  ScrollView, Text,  View, Image, SafeAreaView, StatusBar } from "react-native";
import {Picker} from "@react-native-picker/picker";
import { TextInput } from "react-native-paper";

export default function Curiosity() {
        const [mars, setMars] = useState(0);
        const [day, setDay] = useState(0);
        const [camera, setCamera] = useState("FHAZ");

        const KEY = "X7831OHO7jNbCUFp6ZquUbFjI2txHRDvsbay1fU4";
        const handleChange = (event) => {
          setDay(event.target.value);
        };

        const handleSubmit = (e) => {
          setCamera(e.target.value);
        };

        useEffect(() => {
          axios
            .get(
              `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=${day}&camera=${camera}&api_key=${KEY}`
            )
            .then((response) => {
              // console.log(response.data.photos);
              setMars(response.data.photos);
            })
            .catch((err) => {
              console.log(err);
            });
        }, [day, camera]);
            if (!mars) {
            return <Text>Loading...</Text>;
            }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <Text>Curiosity Rover!</Text>

        <View style={styles.scrollView}>
          <Text>Enter a number - 0 is 1st day on Mars, etc </Text>
        </View>
        <TextInput
          style={styles.textinput}
          type="text"
          // onChange={(event) => handleChange(event)}
          onValueChange={(event) => handleChange(event)}
          placeholder="day"
          name="day"
        ></TextInput>

        <View style={{ height: 50, width: 200 }} htmlFor="camera">
          <Text>Select a camera</Text>
        </View>
        <Picker name="camera" onChange={(e) => handleSubmit(e)} form="camera">
          <Picker.Item label="Front Hazard" value="FHAZ" ></Picker.Item>
          <Picker.Item label="Rear Hazard" value="RHAZ" />

          <Picker.Item value="MAST" label="Mast Mounted" />
          <Picker.Item value="CHEMCAM" label="Chem Cam" />
          <Picker.Item value="MAHLI" label="Mars Hand Lens Imager" />
          <Picker.Item value="MARDI" label="Mars Descent Imager" />
          <Picker.Item value="NAVCAM" label="NAVCAM" />
        </Picker>

        {mars.map((photos) => {
          return (
            <View key={photos.id}>
              <Image
                source={{ uri: photos.img_src }}
                style={styles.returnedimage}
              />

              <Text className="prompt">Date : {photos.earth_date}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#997a00",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight,
  },
  textinput: {
    height: 0,
  },
  returnedimage: {
    width: 100,
    height: 100,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
