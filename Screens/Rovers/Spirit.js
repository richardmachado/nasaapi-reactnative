import React, { useState, useEffect } from "react";
import { ScrollView, View, Text, Image } from "react-native";
import axios from "axios";
import DropDownPicker from "react-native-dropdown-picker";

const KEY = "X7831OHO7jNbCUFp6ZquUbFjI2txHRDvsbay1fU4";

export default function Spirit() {
  const [mars, setMars] = useState(0);
  const [day, setDay] = useState(1);
  const [camera, setCamera] = useState("RHAZ");
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);
  const handleChange = (event) => {
    setDay(event.target.value);
  };
  const handleSubmit = (e) => {
    setCamera(e.target.value);
  };
  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/spirit/photos?sol=${day}&camera=${camera}&api_key=${KEY}`
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
          marginBottom: 150,
        }}
      >
        <DropDownPicker
          items={[
            { label: "Apple", value: "apple" },
            { label: "Banana", value: "banana" },
          ]}
          open={open}
          setOpen={setOpen}
          // value={value}

          defaultIndex={0}
          placeholder="Camera"
          dropDownStyle={{ marginTop: 2, backgroundColor: "skyblue" }}
          containerStyle={{ height: 40, width: 170, height: 70 }}
          onChangeItem={(item) => handleSubmit(item.value)}
        />
      </View>

      <View>
        {mars.map((photos) => {
          return (
            <View key={photos.id}>
              <Image
                source={{
                  uri: `${photos.img_src}`,
                }}
                style={{ height: 350, width: 350 }}
              />

              <Text className="prompt">Date = {photos.earth_date}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
}
