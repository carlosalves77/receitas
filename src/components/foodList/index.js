import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { LinearGradient } from "expo-linear-gradient";

export function FoodList({ data }) {
  const { navigate } = useNavigation();

  function handleNavigate() {
    navigate("Detail", { data: data });
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.container}
      onPress={handleNavigate}
    >
      <Image style={styles.image} source={{ uri: data.cover }} />
      <View style={styles.info}>
        <Text style={styles.name}>{data.name}</Text>
        <Text style={styles.desccription}>
          {data.total_ingredients} ingredientes | {data.time} min{" "}
        </Text>
      </View>
      <LinearGradient
        style={styles.gradient}
        colors={["transparent", "rgba(0,0,0,0.70)", "rgba(0,0,0,0.90)"]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 14,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 14,
  },
  info: {
    position: "absolute",
    bottom: 14,
    left: 14,
    zIndex: 999,
  },
  name: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  desccription: {
    color: "#fff",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "50%",
    borderRadius: 14,
    zIndex: 1,
    backgroundColor: "transparent",
  },
});
