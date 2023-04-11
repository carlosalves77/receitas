import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";

import { api } from "../../services/api/api";
import { FoodList } from "../../components/foodList";

export function Search() {
  const [recipes, setRecipes] = useState([]);
  const route = useRoute();

  useEffect(() => {
    try {
      async function fetchReceipes() {
        const { data } = await api.get(`/foods?name_like=${route.params.name}`);
        setRecipes(data);
      }
    } catch (error) {
      throw error;
    }
    fetchReceipes();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <FoodList data={item} />}
        ListEmptyComponent={() => (
          <Text style={styles.listEmpty}>Nenhuma receita encontrada</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f9ff",
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  listEmpty: {
    fontSize: 16,
  },
});
