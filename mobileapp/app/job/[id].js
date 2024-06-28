import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import JobDetailsComponent from "../../components/JobDetailsComponent";
import { getItem } from "../../utils/localStorageUtils";

const JobDetails = () => {
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkJobDetails = async () => {
      try {
        const storedJobDetails = await getItem("currentJob");
        if (storedJobDetails) {
          setJobDetails(storedJobDetails);
        }
      } catch (error) {
        console.error("Error retrieving job details:", error);
      } finally {
        setLoading(false);
      }
    };
    checkJobDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <JobDetailsComponent job={jobDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default JobDetails;
