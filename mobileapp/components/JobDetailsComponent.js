import React from "react";
import { Text, StyleSheet, ScrollView, Button } from "react-native";
import LocationComponent from "./LocationComponent";
import VehicleComponent from "./VehicleComponent";
import { useRouter } from "expo-router";

const JobDetailsComponent = ({ job }) => {
  const router = useRouter();

  const navigateToMap = () => {
    router.push({
      pathname: "/mapview/MapScreen",
      params: {
        pickupLat: job.pickup.lat,
        pickupLong: job.pickup.lng,
        dropoffLat: job.dropoff.lat,
        dropoffLong: job.dropoff.lng,
        jobId: job.id,
      },
    });
  };

  if (!job) {
    return <Text>No job details available.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.sectionTitle}>Type: {job.type}</Text>
      <Text style={styles.notes}>Notes: {job.notes}</Text>
      <LocationComponent location={job.pickup} title="Pickup Location" />
      <LocationComponent location={job.dropoff} title="Dropoff Location" />
      <Button title="View location on Map" onPress={navigateToMap} />
      <VehicleComponent vehicle={job.vehicle} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  notes: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default JobDetailsComponent;
