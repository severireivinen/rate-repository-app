import React from "react";
import { StyleSheet } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
  inputTextField: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: theme.colors.textSecondary,
    margin: 5,
    padding: 10,
  },
  inputTextFieldError: {
    borderWidth: 1,
    borderRadius: 3,
    borderColor: "#d73a4a",
    margin: 5,
    padding: 10,
  },
  errorText: {
    marginTop: 5,
    marginLeft: 5,
    marginBottom: 10,
    color: "#d73a4a",
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
        style={showError ? styles.inputTextFieldError : styles.inputTextField}
        onChangeText={(value) => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <Text style={styles.errorText}>{meta.error}</Text>}
    </>
  );
};

export default FormikTextInput;
