import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const LocationComponent = ({ location, title }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text>Date: {location.date}</Text>
      <Text>Time Slot: {location.timeslot}</Text>
      <Text>Address: {location.address}</Text>
      <Text>Contact Phone: {location.phone}</Text>
      <Text>Contact Name: {location.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default LocationComponent;
