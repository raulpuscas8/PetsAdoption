import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../const/colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SearchBar = ({ item, navigation }) => {
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectItem = (item) => {};

  const handleSearch = (text) => {
    const filtered = item.filter((r) =>
      r.name.toLowerCase().includes(text.toLowerCase())
    );
    const firstFiltered = filtered.slice(0, 5);
    setSuggestions(firstFiltered);
    setSearch(text);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.search} pointerEvents="none">
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color={COLORS.grey}
          />
        </View>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <TextInput
            style={styles.field}
            placeholder="Caută"
            value={search}
            onChangeText={handleSearch}
            onFocus={handleFocus}
          />
        </TouchableWithoutFeedback>
      </View>
      {isFocused && search.length > 0 && (
        <FlatList
          data={suggestions}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("DetailsScreen", { list: item })
              }
            >
              <View style={styles.itemContainer}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={{ paddingLeft: 10 }}>
                  <Text>{item.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default SearchBar;
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 10,
    backgroundColor: COLORS.white,
    borderRadius: 18,
  },
  inner: {
    flexDirection: "row",
  },
  search: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1.5,
  },
  field: {
    backgroundColor: COLORS.white,
    paddingLeft: 50,
    borderRadius: 18,
    height: 45,
    flex: 1,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  textName: {
    fontSize: 20,
    marginLeft: 10,
    fontWeight: "800",
  },
});
