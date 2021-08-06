import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  signInField: {
    margin: 5,
    padding: 15,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  signInText: {
    alignSelf: "center",
    color: "white",
  },
});

const SignInForm = ({ onSubmit }) => {
  return (
    <View style={styles.container}>
      <FormikTextInput
        name="username"
        placeholder="Username"
        testID="usernameField"
      />
      <FormikTextInput
        secureTextEntry
        name="password"
        placeholder="Password"
        testID="passwordField"
      />
      <Pressable
        onPress={onSubmit}
        style={styles.signInField}
        testID="signInBtn"
      >
        <Text fontSize="subheading" style={styles.signInText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  );
};

export default SignInForm;
