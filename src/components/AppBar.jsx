import React from "react";
import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import AppBarTab from "./AppBarTab";
import { Link } from "react-router-native";
import useAuthStorage from "../hooks/useAuthStorage";
import { useApolloClient, useQuery } from "@apollo/client";
import { IS_AUTHORIZED } from "../graphql/queries";

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#24292e",
  },
  // ...
});

const AppBar = () => {
  const authStorage = useAuthStorage();
  const client = useApolloClient();
  const token = authStorage.getAccessToken();

  let user = null;

  if (token) {
    const { data } = useQuery(IS_AUTHORIZED, {
      fetchPolicy: "cache-and-network",
    });

    if (data) {
      data.authorizedUser !== null
        ? (user = data.authorizedUser)
        : (user = null);
    }
  }

  //console.log("User: ", user);

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
        {!user ? (
          <Link to="/signin">
            <AppBarTab content={"Sign in"} />
          </Link>
        ) : (
          <Link to="/">
            <Pressable onPress={signOut}>
              <AppBarTab content={"Sign out"} />
            </Pressable>
          </Link>
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
