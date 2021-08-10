import React from "react";
import { FlatList, Pressable, StyleSheet, View, Alert } from "react-native";
import Text from "./Text";
import theme from "../theme";
import { format, parseISO } from "date-fns";
import useDeleteReview from "../hooks/useDeleteReview";
import { useHistory } from "react-router-native";
import useAuthorizedUser from "../hooks/useAuthorizedUser";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container: {
    backgroundColor: "white",
    padding: 10,
  },
  containerInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  reviewContainer: {
    flexDirection: "column",
  },
  textContainer: {
    marginTop: 5,
    marginBottom: 5,
    width: 340,
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  viewContainer: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
  },
  buttonText: {
    color: "white",
  },
  deleteContainer: {
    margin: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 3,
    backgroundColor: "#e65055",
    justifyContent: "center",
  },
});

const ReviewItem = ({ review, refetch }) => {
  const [deleteReview] = useDeleteReview();
  const history = useHistory();

  const handleView = () => {
    history.push(`/repo/${review.repository.id}`);
  };

  const handleDelete = () => {
    Alert.alert(
      "Delete review",
      "Are you sure you want to delete this review",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const id = review.id;
            try {
              deleteReview({ id });
            } catch (e) {
              console.log(e);
            }
            refetch();
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerInfo}>
        <View style={styles.reviewNumberContainer}>
          <Text fontWeight="bold" style={{ color: theme.colors.primary }}>
            {review.rating}
          </Text>
        </View>
        <View style={styles.reviewContainer}>
          <View style={styles.userContainer}>
            <Text fontWeight="bold">{review.user.username}</Text>
            <Text color="textSecondary">
              {format(parseISO(review.createdAt), "dd.MM.yyyy")}
            </Text>
          </View>
          <View style={styles.textContainer}>
            <Text>{review.text}</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={handleView} style={styles.viewContainer}>
          <Text fontWeight="bold" style={styles.buttonText}>
            View repository
          </Text>
        </Pressable>
        <Pressable onPress={handleDelete} style={styles.deleteContainer}>
          <Text fontWeight="bold" style={styles.buttonText}>
            Delete review
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviews = () => {
  const { authorizedUser, refetch } = useAuthorizedUser({
    includeReviews: true,
  });

  const reviews = authorizedUser
    ? authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];
  if (!authorizedUser) return <Text>Loading...</Text>;

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export default MyReviews;
