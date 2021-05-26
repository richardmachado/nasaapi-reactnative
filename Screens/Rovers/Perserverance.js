import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, TextInput } from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

import { styles } from './styles/RoverStyles';
const KEY = "";

export default function Perserverance() {
  const [mars, setMars] = useState(0);
  const [day, setDay] = useState(1);
  const [camera, setCamera] = useState("EDL_PUCAM2");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { value: "REAR_HAZCAM_LEFT", label: "REAR HAZCAM LEFT" },
    { value: "REAR_HAZCAM_RIGHT", label: "REAR HAZCAM RIGHT" },
    { value: "NAVCAM_LEFT", label: "Navcam Left" },
    { value: "NAVCAM_RIGHT", label: "Navcam Right" },
    { value: "FRONT_HAZCAM_RIGHT_A", label: "Front Hazcam - Right" },
    { value: "FRONT_HAZCAM_LEFT_A", label: "Front Hazcam - Left" },
    { value: "SKYCAM", label: "MEDA Skycam" },
    { value: "SHERLOC_WATSON", label: "SHERLOC WATSON" },
    { value: "EDL_RUCAM", label: "Rover Up-Look Camera" },
    { value: "EDL_RDCAM", label: "Rover Down-Look Camera" },
    { value: "EDL_DDCAM", label: "Descent Stage Down-Look Camera" },
    { value: "EDL_PUCAM1", label: "Parachute Up-Look Camera A" },
    { value: "EDL_PUCAM2", label: "Parachute Up-Look Camera B" },
    { value: "MCZ_RIGHT", label: "MASTCAM-Z-RIGHT" },
    { value: "MCZ_LEFT", label: "MASTCAM-Z-LEFT" },
  ]);

  const handleChange = (event) => {
    setDay(event);
  };
  const handleSubmit = (e) => {
    setCamera(e);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/perseverance/photos?sol=${day}&camera=${camera}&api_key=${KEY}`
      )
      .then((response) => {
        setMars(response.data.photos);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [day, camera]);
  if (!mars) {
    return (
      <View>
        <Text>Loading.. </Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View
        style={styles.pickers}
      >
        <DropDownPicker
          items={items}
          open={open}
          setOpen={setOpen}
          value={value}
          style={{ paddingVertical: 10 }}
          defaultIndex={0}
          placeholder="Camera"
          dropDownStyle={{ marginTop: 2 }}
          containerStyle={{ height: 40, width: 120, height: 70 }}
          // onChangeItem={(item) => handleSubmit(item.value)}
          setValue={(item) => handleSubmit(item)}
          setItems={setItems}
        />

        <TextInput
          style={styles.input}
          onChangeText={handleChange}
          // value={value}
          placeholder="day"
          keyboardType="numeric"
        />
      </View>

      <View>
        <Text>
          You selected {camera} and {day}{" "}
        </Text>
        {mars.map((photos) => {
          return (
            <View key={photos.id}>
              <Image
                source={{
                  uri: `${photos.img_src}`,
                }}
                style={styles.photos}
              />

              <Text
                style={styles.date}
              >
                Date = {photos.earth_date}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
