import React from "react";
import RepositoryItem from "./RepositoryItem";
import { useParams } from "react-router";
import useRepository from "../hooks/useRepository";
import Text from "./Text";
import { FlatList, StyleSheet, View } from "react-native";
import theme from "../theme";
import { format, parseISO } from "date-fns";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },
  reviewContainer: {
    flexDirection: "column",
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: 340
  },
  reviewNumberContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: theme.colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  userContainer: {
    flexDirection: "column",
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem item={repository} singleRepo={true} />
);

const ReviewItem = ({ review }) => (
  <View style={styles.container}>
    <View style={styles.reviewNumberContainer}>
      <Text fontWeight="bold" style={{ color: theme.colors.primary }}>
        {review.rating}
      </Text>
    </View>
    <View style={styles.reviewContainer}>
      <View style={styles.userContainer}>
        <Text fontWeight="bold">{review.user.username}</Text>
        <Text color="textSecondary">{format(parseISO(review.createdAt), "dd.MM.yyyy")}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text>{review.text}</Text>
      </View>
    </View>
  </View>
);

const SingleRepositoryView = () => {
  const { id } = useParams();
  const { repository, error, loading } = useRepository(id);

  const reviews = repository
    ? repository.reviews.edges.map((edge) => edge.node)
    : [];

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Something went wrong!</Text>;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} />}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    />
  );
};

export default SingleRepositoryView;
