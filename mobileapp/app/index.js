import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  Button,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
  Alert,
} from "react-native";
import { COLORS } from "../constants/theme";
import OtpInput from "../components/OtpInput";
import { validateOtp as validateOtpApi } from "../api/job";
import {getItem, removeItem} from '../utils/localStorageUtils'

export default Home = () => {
  const router = useRouter();

  useEffect(() => {
    const checkJobDetails = async () => {
      const storedJobDetails = await getItem("currentJob");
      if (storedJobDetails) {
        router.push({
          pathname: `/job/${storedJobDetails.id}`,
          params: { jobDetails: storedJobDetails },
        });
      }
    };

    checkJobDetails();
  }, []);

  const deleteStoredJob = async () => {
    try {
      await removeItem("currentJob");
    } catch (error) {
      console.error("Error deleting currentJob:", error.message);
    }
  };

  const validateOtp = async () => {
    try {      
        const job = await validateOtpApi(otp);
        router.push({
          pathname: `/job/${job.id}`,
          params: { jobDetails: { ...job } },
        });
    } catch (error) {
      if (error.message === 'Invalid OTP') {
        Alert.alert("Invalid OTP", "Please enter a valid OTP.");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
        console.error("Error validating OTP:", error);
      }
    }
  };

  const [otp, setOtp] = useState("");
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <OtpInput value={otp} onChangeText={setOtp} />
        <Button title="Validate OTP" onPress={validateOtp} />
        <Button title="Delete currentJob" onPress={deleteStoredJob} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: COLORS.lightWhite,
  },
});
