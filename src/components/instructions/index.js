import { View, Text, StyleSheet } from "react-native";

export function Instructions({ data, index }) {
  return (
    <View style={style.container}>
      <Text style={style.ingredientsIndex}>{index + 1}- </Text>

      <Text style={style.ingredientsName}>{data.text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    justifyContent: "flex-start",
  },
  ingredientsIndex: {
    fontSize: 18,
    color: "#121212",
    fontWeight: "bold",
  },
  ingredientsName: {
    lineHeight: 20,
  },
});
