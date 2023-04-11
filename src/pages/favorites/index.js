import { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { FoodList } from "../../components/foodList";

import { getFavorites } from "../../utils/storage";

export function Favorites() {
  const [receipes, setReceipes] = useState([]);

  const ifFocused = useIsFocused();

  useEffect(() => {
    let isActive = true;

    async function getRecipes() {
      const result = await getFavorites("@appreceitas");
      if (isActive) {
        setReceipes(result);
      }
    }
    if (isActive) {
      getRecipes();
    }

    return () => {
      isActive = false;
    };
  }, [ifFocused]);
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Receitas favoritas</Text>
      {receipes.length === 0 && <Text>Você não tem receitas favoritas.</Text>}
      <FlatList
        showsVerticalScrollIndicator={false}
        styles={{ marginTop: 14 }}
        data={receipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 36,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
});
