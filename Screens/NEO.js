import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, ScrollView, ImageBackground, StyleSheet } from "react-native";
import moment from "moment";
import DropDownPicker from "react-native-dropdown-picker";
import NeoKey from "./NeoKey";

var today = moment().utc().format("YYYY-MM-DD");
var tomorrow = moment().utc().add(1, "d").format("YYYY-MM-DD");
var dayaftertomorrow = moment().utc().add(2, "d").format("YYYY-MM-DD");
var twodaysaftertomorrow = moment().utc().add(3, "d").format("YYYY-MM-DD");
var threedaysaftertomorrow = moment().utc().add(4, "d").format("YYYY-MM-DD");
var fourdaysaftertomorrow = moment().utc().add(5, "d").format("YYYY-MM-DD");
var fivedaysaftertomorrow = moment().utc().add(6, "d").format("YYYY-MM-DD");
var sixdaysaftertomorrow = moment().utc().add(7, "d").format("YYYY-MM-DD");

const image = { uri: "https://scx2.b-cdn.net/gfx/news/2019/dontworryabo.jpg" };

const KEY = "";

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function NEO() {
  const [neo, setNeo] = useState([]);
  const [date, setDate] = useState(today);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [items, setItems] = useState([
    { value: today, label: today },
    { value: tomorrow, label: tomorrow },
    { value: dayaftertomorrow, label: dayaftertomorrow },
    { value: twodaysaftertomorrow, label: twodaysaftertomorrow },
    { value: threedaysaftertomorrow, label: threedaysaftertomorrow },
    { value: fourdaysaftertomorrow, label: fourdaysaftertomorrow },
    { value: fivedaysaftertomorrow, label: fivedaysaftertomorrow },
    { value: sixdaysaftertomorrow, label: sixdaysaftertomorrow },
  ]);

  const handleSubmit = (e) => {
    setDate(e);
  };

  useEffect(() => {
    axios
      .get(
        `https://api.nasa.gov/neo/rest/v1/feed/?date=${today}?detailed=true&api_key=${KEY}`
      )
      .then((response) => {
        setNeo(response.data.near_earth_objects[date]);
        // console.log(response.data.near_earth_objects[date])
      })
      .catch((err) => {
        console.log(err);
      });
  }, [date]);

  return (
    <ScrollView>
      <ImageBackground source={image} style={styles.image} >
      <DropDownPicker
        items={items}
        open={open}
        setOpen={setOpen}
        value={value}
        defaultIndex={0}
        placeholder="Select a date"
        dropDownStyle={{ marginTop: 2 }}
        containerStyle={{ height: 100 }}
        setValue={(item) => handleSubmit(item)}
        setItems={setItems}
      />

      <View>
        <View>
          <NeoKey />
        </View>
        {neo.map((neos) => {
          return (
            <View key={neos.name} style={{ marginBottom: 25 }}>
              <Text style={{color:"white"}}>Closest Approach Date: {date}</Text>
              <Text style={{ color: "white" }}>
                Asteroid Name: {" "}
                {neos.is_potentially_hazardous_asteroid === false ? (
                  <Text style={{ backgroundColor: "lightblue", color:"black" }}>
                    
                    {neos.name}
                  </Text>
                ) : (
                  <Text style={{ backgroundColor: "pink", color:"black" }}>{neos.name}</Text>
                )}
              </Text>

              <Text style={{ color: "white" }}>
                Maximum Diameter:{" "}
                {Math.round(
                  neos.estimated_diameter.feet.estimated_diameter_max * 100
                ) / 100}{" "}
                feet
              </Text>

              <Text style={{ color: "white" }}>
                {neos.close_approach_data[0].miss_distance.miles < 500000 ? (
                  <Text style={{ backgroundColor: "pink", color:"black" }}>
                    Miss Distance :{" "}
                    {numberWithCommas(
                      Math.round(
                        neos.close_approach_data[0].miss_distance.miles
                      )
                    )}
                  </Text>
                ) : (
                  <Text style={{  color:"white" }}>
                    Miss Distance :{" "}
                    {numberWithCommas(
                      Math.round(
                        neos.close_approach_data[0].miss_distance.miles
                      )
                    )}
                  </Text>
                )}
              </Text>

              <Text style={{ color: "white" }}>
                Relative Velocity:{" "}
                {numberWithCommas(
                  Math.round(
                    neos.close_approach_data[0].relative_velocity.miles_per_hour
                  )
                )}{" "}
                MPH
              </Text>
            </View>
          );
        })}
        </View>
        </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  text: {
    color: "white",
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000a0"
  }
});