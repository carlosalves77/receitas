import { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { Logo } from "../../components/logo";
import { FoodList } from "../../components/foodList";

import { Ionicons } from "@expo/vector-icons";

import { api } from "../../services/api/api";

export function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [recipes, setRecipes] = useState([]);

  function handleSearch() {}

  useEffect(() => {
    async function fetchApi() {
      const { data } = await api.get("/foods");
      setRecipes(data);
    }

    fetchApi();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}>Encontre a receita</Text>
      <Text style={styles.title}>que combina com você</Text>

      <View style={styles.form}>
        <TextInput
          placeholder="Digite o nome da receita"
          style={styles.input}
          value={searchValue}
          onChangeText={(text) => setSearchValue(text)}
        />
        <TouchableOpacity onPress={handleSearch}>
          <Ionicons name="search" size={24} color="#4CBE6C" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0E0E0E",
  },
  form: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    width: "100%",
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ECECEC",
    paddingLeft: 8,
    paddingRight: 8,
  },
  input: {
    width: "90%",
    height: 54,
    maxHeight: "90%",
  },
});
