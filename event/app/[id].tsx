import Fontisto from "@expo/vector-icons/Fontisto";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");
const ITEM_MARGIN = 8;
const GRID_ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2;

export default function DetailScreen() {
  const { id, title, image, date } = useLocalSearchParams<{
    id: string;
    title?: string;
    image?: string;
    date?: string;
  }>();
  const [imgs, setI] = useState<string[]>([]);

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events/${id}?apikey=${process.env.EXPO_PUBLIC_TM_KEY}`,
    )
      .then((res) => res.json())
      .then((res) => {
        setI(res.images.map((v: any) => v.url));
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      {/* 设置导航栏标题 */}
      <Stack.Screen
        options={{
          title,
        }}
      />

      <ScrollView style={styles.container}>
        <Image source={{ uri: image }} style={styles.image} />

        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.date}>
            <Fontisto name="date" size={12} color="gray" />
            {date}
          </Text>
          <LinearGradient
            colors={["transparent", "#e5e7eb", "transparent"]}
            style={styles.gradientDivider}
          />
        </View>
        <Text style={styles.desc}>图片详情</Text>
        <View
          style={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            paddingBottom: 36,
          }}
        >
          {imgs.map((img, id) => (
            <Image
              key={id}
              source={{ uri: img }}
              style={[styles.image, styles.item, styles.gridItem]}
            />
          ))}
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 260,
    backgroundColor: "#eee",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: "#a1a1a1ff",
    display: "flex",
    gap: 4,
  },
  desc: {
    fontSize: 14,
    color: "#666",
    lineHeight: 22,
    marginHorizontal: 12,
  },
  gradientDivider: {
    height: 1,
    marginVertical: 16,
  },
  item: {
    backgroundColor: "#fff",
    marginHorizontal: 8,
    marginVertical: 6,
    padding: 10,
    borderRadius: 8,
  },
  gridItem: {
    width: GRID_ITEM_WIDTH,
    marginLeft: ITEM_MARGIN,
    marginRight: 0,
  },
});
