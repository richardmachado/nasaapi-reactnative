import React, {Component} from "react";
import axios from 'axios';

import { View, Text, Image } from "react-native";

import DateTimePicker from '@react-native-community/datetimepicker';

const KEY = "";

class POTD extends Component {
  state = {
    date: new Date(),
    photo: "",
  };
  randomDate = (start, end) => {
    // return random date between start of Nasa POD and current Date
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime())
    );
  };

  handleClick = (date) => {
    // generates random date and passes it into our
    // changeDate function which also updates state and
    // fetches a photo again
    // first available date is 06/16/1995
    let ranDate = this.randomDate(new Date(1995, 0o6 - 1, 16), new Date());
    this.changeDate(ranDate);
  };
  formatDate = (date) => {
    // converts date to yyyy-mm-dd
    return date.toISOString().split("T")[0];
  };
  changeDate = (date) => {
    this.setState({ date: date });
    this.getPhotoByDate(this.formatDate(date));
  };
  getPhotoByDate = (date) => {
    fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=${KEY}`)
      .then((response) => {
        return response.json();
      })
      .then((photoData) => {
        this.setState({ photo: photoData });
      });
  };
  // lifecycle method that render photo before app renders
  componentDidMount() {
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${KEY}`)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        this.setState({ photo: json });
      });
  }

  render() {
    // Style for header
    const headerStyle = {
      textAlign: "center",
    };
    const box = {
      height: "1000px",
      width: "50%",
    };
    return (
      <View className={box}>
        <View>
          <Text style={headerStyle}>NASA's Astronomy Picture of the Day</Text>

 
          <DatePicker
            date={this.state.date}
            changeDate={this.changeDate}
            handleClick={this.handleClick}
          />
          <Image photo={this.state.photo} />
        </View>
      </View>
    );
  }
}

export default POTD;