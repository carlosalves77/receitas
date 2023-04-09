import { View, Text, StyleSheet } from "react-native";

export function Ingredients({ data }) {
  return (
    <View style={style.container}>
      <Text style={style.ingredientsName}>{data.name}</Text>
      <Text>{data.amount}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",

    backgroundColor: "#fff",
    alignItems: "center",
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
  },
  ingredientsName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#121212",
  },
});
