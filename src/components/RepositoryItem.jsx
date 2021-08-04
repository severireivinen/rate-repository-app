import React from "react";
import { View, Image, StyleSheet } from "react-native";
import Text from "./Text";
import theme from "../theme";

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
  mainFooter: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

const mutateNumber = (number) => {
  const suffix = 'k';
  try {
    const num = Number(number);
    if (num < 1000) {
      return num;
    } else {
      const newNum = number / 1000;
      return (Math.round(newNum * 10) / 10) + suffix;
    }
  } catch (e) {
    console.log(number, ' is not a number.', e.message);
  }
};

const RepositoryItem = ({ item }) => (
  <View style={styles.container}>
    <View style={styles.wrapper}>
      <View style={styles.mainHeader}>
        <Image
          style={styles.tinyLogo}
          source={{ uri: item.ownerAvatarUrl }}
        ></Image>
        <View style={styles.headerText}>
          <Text color="textPrimary" fontWeight="bold" fontSize="subheading">
            {item.fullName}
          </Text>
          <Text color="textSecondary">{item.description}</Text>
          <View style={styles.language}>
            <Text style={{ color: "white", margin: 3 }}>{item.language}</Text>
          </View>
        </View>
      </View>
      <View style={styles.mainFooter}>
        <View>
          <Text color="textPrimary" fontWeight="bold" fontSize="subheading">
            {mutateNumber(item.stargazersCount)}
          </Text>
          <Text color="textSecondary">Stars</Text>
        </View>
        <View>
          <Text color="textPrimary" fontWeight="bold" fontSize="subheading">
            {mutateNumber(item.forksCount)}
          </Text>
          <Text color="textSecondary">Forks</Text>
        </View>
        <View>
          <Text color="textPrimary" fontWeight="bold" fontSize="subheading">
            {mutateNumber(item.reviewCount)}
          </Text>
          <Text color="textSecondary">Reviews</Text>
        </View>
        <View>
          <Text color="textPrimary" fontWeight="bold" fontSize="subheading">
            {mutateNumber(item.ratingAverage)}
          </Text>
          <Text color="textSecondary">Rating</Text>
        </View>
      </View>
    </View>
  </View>
);

export default RepositoryItem;
