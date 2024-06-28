import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { COLORS } from "../constants/theme";

const VehicleComponent = ({ vehicle }) => {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Vehicle</Text>
      <Text>ID: {vehicle.id}</Text>
      <Text>Plate Number: {vehicle.plateNumber}</Text>
      <Image source={{ uri: vehicle.image }} style={styles.vehicleImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 20,
    marginTop: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  vehicleImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginTop: 10,
  },
});

export default VehicleComponent;
