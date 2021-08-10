import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient } from "@apollo/client";
import useAuthorizedUser from "../hooks/useAuthorizedUser";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  containerItems: {
    flexDirection: "row",
  },
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const { authorizedUser } = useAuthorizedUser();

  const signOut = () => {
    authStorage.removeAccessToken();
    client.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <Link to="/">
          <AppBarTab content={"Repositories"} />
        </Link>
        {authorizedUser ? (
          <View style={styles.containerItems}>
            <Link to="/review">
              <AppBarTab content={"Create a review"} />
            </Link>
            <Link to="/myreviews">
              <AppBarTab content={"My Reviews"} />
            </Link>
            <Link to="/">
              <Pressable onPress={signOut}>
                <AppBarTab content={"Sign out"} />
              </Pressable>
            </Link>
          </View>
        ) : (
          <View style={styles.containerItems}>
            <Link to="/signup">
              <AppBarTab content={"Sign up"} />
            </Link>
            <Link to="/signin">
              <AppBarTab content={"Sign in"} />
            </Link>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
