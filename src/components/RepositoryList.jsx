import React, { useState } from "react";
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import RepositoryItem from "./RepositoryItem";
import useRepositories from "../hooks/useRepositories";
import { useHistory } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { Searchbar } from "react-native-paper";
import { useDebounce } from "use-debounce";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    // this.props contains the component's props
    const { order, setOrder, searchQuery, setSearchQuery } = this.props;

    return (
      <ListHeader
        order={order}
        setOrder={setOrder}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
    );
  };

  render() {
    const { repositories, handlePress } = this.props;

    const repositoryNodes = repositories
      ? repositories.edges.map((edge) => edge.node)
      : [];

    const renderItem = ({ item }) => (
      <Pressable onPress={() => handlePress(item)}>
        <RepositoryItem item={item} singleRepo={false} />
      </Pressable>
    );

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={this.renderHeader} // Order component
      />
    );
  }
}

// Picker bug which resets selectedValue to first item. Could not find a fix for this. Selection working otherwise.
const ListHeader = ({ order, setOrder, searchQuery, setSearchQuery }) => {
  return (
    <View>
      <Searchbar
        placeholder="Search..."
        onChangeText={(query) => setSearchQuery(query)}
        value={searchQuery}
      />
      <Picker
        selectedValue={order}
        onValueChange={(itemValue) => setOrder(itemValue)}
      >
        <Picker.Item
          label="Latest repositories"
          value={{ type: "CREATED_AT", direction: "DESC" }}
        />
        <Picker.Item
          label="Highest rated repositories"
          value={{ type: "RATING_AVERAGE", direction: "DESC" }}
        />
        <Picker.Item
          label="Lowest rated repositories"
          value={{ type: "RATING_AVERAGE", direction: "ASC" }}
        />
      </Picker>
    </View>
  );
};

const RepositoryList = () => {
  const history = useHistory();
  const [order, setOrder] = useState({ type: "CREATED_AT", direction: "DESC" });
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceSearchQuery] = useDebounce(searchQuery, 500);
  const { repositories } = useRepositories(
    order.type,
    order.direction,
    debounceSearchQuery
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      handlePress={(item) => history.push(`/repo/${item.id}`)}
      order={order}
      setOrder={setOrder}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  );
};

export default RepositoryList;
