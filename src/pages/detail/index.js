import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Entypo } from "@expo/vector-icons";

export function Detail() {
  const navigation = useNavigation();

  const route = useRoute();
  const { data } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data.name,
      headerRight: () => (
        <Pressable onPress={() => console.log("testando")}>
          <Entypo name="heart" size={24} color="#FF4141" />
        </Pressable>
      ),
    });
  }, [navigation, data.name]);
  return (
    <View style={styles.container}>
      <Text>{data.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
  },
});
