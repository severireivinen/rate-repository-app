import React from "react";
import { View, StyleSheet, Pressable } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  signUpField: {
    margin: 5,
    padding: 15,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  signUpText: {
    alignSelf: "center",
    color: "white",
  },
});

const SignUpForm = ({ onSubmit }) => (
  <View style={styles.container}>
    <FormikTextInput name="username" placeholder="Username" />
    <FormikTextInput secureTextEntry name="password" placeholder="Password" />
    <FormikTextInput
      secureTextEntry
      name="passwordConfirm"
      placeholder="Confirm password"
    />
    <Pressable onPress={onSubmit} style={styles.signUpField}>
      <Text fontWeight="bold" style={styles.signUpText}>
        Sign Up
      </Text>
    </Pressable>
  </View>
);

export default SignUpForm;
