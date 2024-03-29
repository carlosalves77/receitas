import { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Image,
  Modal,
  Share,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";

import { Ingredients } from "../../components/ingredients";
import { Instructions } from "../../components/instructions";
import { Video } from "../../components/video";

import { isFavorite, saveFavorites, removeItem } from "../../utils/storage";

import { Entypo, AntDesign, Feather } from "@expo/vector-icons";

export function Detail() {
  const navigation = useNavigation();
  const route = useRoute();
  const { data } = route.params;

  const [modalVisible, setModalVisible] = useState(false);
  const [favorite, setFavorite] = useState(false);

  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const receipeFavorite = await isFavorite(data);
      setFavorite(receipeFavorite);
    }

    getStatusFavorites();

    navigation.setOptions({
      title: data.name,
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteReceipe(data)}>
          {favorite ? (
            <Entypo name="heart" size={24} color="#FF4141" />
          ) : (
            <Entypo name="heart-outlined" size={24} color="#FF4141" />
          )}
        </Pressable>
      ),
    });
  }, [navigation, data.name, favorite]);

  async function handleFavoriteReceipe(receipe) {
    if (favorite) {
      await removeItem(receipe.id);
      setFavorite(false);
    } else {
      await saveFavorites("@appreceitas", receipe);
      setFavorite(true);
    }
  }

  function handleOpenVideo() {
    setModalVisible(true);
  }

  async function shareReceipe() {
    try {
      await Share.share({
        message: `Olha que receita legal que eu encontrei no app Receitas: ${data.name}\n ingredientes: ${data.total_ingredients} vi lá no epp receita fácil`,
        url: data.video,
      });
    } catch (error) {
      throw error;
    }
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 14 }}
    >
      <Pressable onPress={() => handleOpenVideo()}>
        <View style={styles.playIcon}>
          <AntDesign name="playcircleo" size={48} color="#FAFAFA" />
        </View>
        <Image source={{ uri: data.cover }} style={styles.image} />
      </Pressable>
      <View style={styles.headerDetails}>
        <View>
          <Text style={styles.title}>{data.name}</Text>
          <Text style={styles.ingredientsText}>
            ingredientes ({data.total_ingredients})
          </Text>
        </View>
        <Pressable onPress={() => shareReceipe()}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>
      {data.ingredients.map((item) => (
        <Ingredients key={item.id} data={item} />
      ))}
      <View style={styles.instructionsArea}>
        <Text style={styles.instructionsText}>Modo de preparo</Text>
        <Feather name="arrow-down" size={24} color="#FFF" />
      </View>
      {data.instructions.map((item, index) => (
        <Instructions key={item.id} data={item} index={index} />
      ))}

      <Modal visible={modalVisible} animationType="slide">
        <Video
          handleClose={() => setModalVisible(false)}
          videoUrl={data.video}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F9FF",
    paddingStart: 14,
    paddingTop: 14,
    paddingEnd: 14,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 14,
  },
  playIcon: {
    position: "absolute",
    zIndex: 999,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 4,
    color: "#000",
  },
  ingredientsText: {
    marginBottom: 14,
    fontSize: 16,
  },
  headerDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  instructionsArea: {
    flexDirection: "row",
    backgroundColor: "#4CBE6C",
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
    alignItems: "center",
  },
  instructionsText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#FFF",
    marginRight: 8,
  },
});
