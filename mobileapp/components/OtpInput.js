import React from "react";
import { TextInput, StyleSheet, Text, View } from "react-native";
import { COLORS } from "../constants/theme";

const OtpInput = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OTP Verification</Text>
      <Text style={styles.instruction}>
        Please enter the 4-digit OTP sent to your mobile number.
      </Text>
      <TextInput
        style={styles.otpInput}
        value={value}
        onChangeText={onChangeText}
        keyboardType="numeric"
        maxLength={4}
        placeholder="Enter OTP"
        returnKeyType="done"
        blurOnSubmit={false}
      />
    </View>
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
  otpInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
    fontSize: 18,
    width: "80%",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  instruction: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default OtpInput;
