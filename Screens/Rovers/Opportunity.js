import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image, TextInput } from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const KEY = "";

export default function Opportunity() {
  const [mars, setMars] = useState(0);
  const [day, setDay] = useState(1);
  const [camera, setCamera] = useState("FHAZ");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { value: "RHAZ", label: "Rear Hazard" },
    { value: "FHAZ", label: "Front Hazard" },
    { value: "NAVCAM", label: "Navigation Cam" },
    { value: "PANCAM", label: "Panoramic Cam" },
    { value: "MINITES", label: "MiniTES" },
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
        `https://api.nasa.gov/mars-photos/api/v1/rovers/opportunity/photos?sol=${day}&camera=${camera}&api_key=${KEY}`
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
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 200,
        }}
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
          style={{
            height: 50,
            width: 65,
            marginLeft: 5,
            borderWidth: 1,
          }}
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
                style={{ height: 375, width: 375, marginLeft: 25 }}
              />

              <Text
                style={{
                  justifyContent: "center",
                  fontSize: 24,
                  marginBottom: 10,
                  marginTop: 10,
                }}
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
