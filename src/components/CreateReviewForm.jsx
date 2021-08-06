import React from "react";
import { Pressable, View } from "react-native";
import theme from "../theme";
import FormikTextInput from "./FormikTextInput";
import Text from "./Text";

const CreateReviewForm = ({ onSubmit }) => {
  const styles = {
    container: {
      backgroundColor: "white",
      padding: 10,
    },
    submitContainer: {
      margin: 5,
      padding: 15,
      borderRadius: 3,
      backgroundColor: theme.colors.primary,
    },
    submitText: {
      alignSelf: "center",
      color: "white",
    },
  };

  return (
    <View style={styles.container}>
      <FormikTextInput name="ownerName" placeholder="Repository owner name" />
      <FormikTextInput name="repositoryName" placeholder="Repository name" />
      <FormikTextInput name="rating" placeholder="Rating between 0 and 100" />
      <FormikTextInput name="text" placeholder="Review" multiline={true} />
      <Pressable onPress={onSubmit} style={styles.submitContainer}>
        <Text style={styles.submitText}>Create a review</Text>
      </Pressable>
    </View>
  );
};

export default CreateReviewForm;
