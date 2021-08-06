import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";
import * as Linking from "expo-linking";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  wrapper: {
    margin: 10,
  },
  mainHeader: {
    flexDirection: "row",
  },
  headerText: {
    alignItems: "flex-start",
    marginLeft: 10,
    marginBottom: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  language: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
  },
  githubBtn: {
    backgroundColor: theme.colors.primary,
    borderRadius: 4,
    marginTop: 15,
    padding: 10,
  },
  githubText: {
    alignSelf: "center",
    color: "white",
  },
  mainFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const mutateNumber = (number) => {
  const suffix = "k";
  try {
    const num = Number(number);
    if (num < 1000) {
      return num;
    } else {
      const newNum = number / 1000;
      return Math.round(newNum * 10) / 10 + suffix;
    }
  } catch (e) {
    console.log(number, " is not a number.", e.message);
  }
};

const RepositoryItem = ({ item, singleRepo }) => {
  const handlePress = (repo) => {
    Linking.openURL(repo);
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.mainHeader}>
          <Image
            style={styles.tinyLogo}
            source={{ uri: item.ownerAvatarUrl }}
          ></Image>
          <View style={styles.headerText}>
            <Text
              color="textPrimary"
              fontWeight="bold"
              fontSize="subheading"
              testID="fullName"
            >
              {item.fullName}
            </Text>
            <Text color="textSecondary" testID="description">
              {item.description}
            </Text>
            <View style={styles.language}>
              <Text style={{ color: "white", margin: 3 }} testID="language">
                {item.language}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.mainFooter}>
          <View>
            <Text
              color="textPrimary"
              fontWeight="bold"
              fontSize="subheading"
              testID="stargazersCount"
            >
              {mutateNumber(item.stargazersCount)}
            </Text>
            <Text color="textSecondary">Stars</Text>
          </View>
          <View>
            <Text
              color="textPrimary"
              fontWeight="bold"
              fontSize="subheading"
              testID="forksCount"
            >
              {mutateNumber(item.forksCount)}
            </Text>
            <Text color="textSecondary">Forks</Text>
          </View>
          <View>
            <Text
              color="textPrimary"
              fontWeight="bold"
              fontSize="subheading"
              testID="reviewCount"
            >
              {mutateNumber(item.reviewCount)}
            </Text>
            <Text color="textSecondary">Reviews</Text>
          </View>
          <View>
            <Text
              color="textPrimary"
              fontWeight="bold"
              fontSize="subheading"
              testID="ratingAverage"
            >
              {item.ratingAverage}
            </Text>
            <Text color="textSecondary">Rating</Text>
          </View>
        </View>
        {singleRepo ? (
          <View style={styles.githubBtn}>
            <Text
              fontWeight="bold"
              style={styles.githubText}
              onPress={() => handlePress(item.url)}
            >
              Open in GitHub
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default RepositoryItem;
