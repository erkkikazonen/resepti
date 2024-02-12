import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  ActivityIndicator,
  Image
} from "react-native";

export default function App() {
  const [keyword, setKeyword] = useState("");
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRepositories = () => {
    setLoading(true);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setRepositories(data.meals);
        setLoading(false);
      })
      .catch((error) => {
        console.error("There was a problem fetching the data: ", error);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ marginTop: 80, flex: 1 }}>
        <TextInput
          placeholder="Type keyword..."
          value={keyword}
          onChangeText={(text) => setKeyword(text)}
        />
        <Button title="Search" onPress={fetchRepositories} />
      </View>
      <View style={{ flex: 6 }}>
        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <FlatList
            data={repositories}
            renderItem={({ item }) => (
              <View style={{ margin: 10 }}>
                <Text style={{ fontSize: 18 }}>{item.strMeal}</Text>
                <Image
                  source={{ uri: item.strMealThumb }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            )}
           
          />
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
