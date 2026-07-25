import { ThemedView } from "@/components/themed-view";
import Fontisto from "@expo/vector-icons/Fontisto";
import { router, Stack } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TextInputSubmitEditingEvent,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

type Item = {
  id: string;
  title: string;
  image: string;
  date: string;
};

export default function ListToggleScreen() {
  const [isGrid, setIsGrid] = useState(false);
  const [data, setData] = useState<Item[]>([]);
  const [loadingMore, setLM] = useState(false);
  const [searchTxt, setST] = useState("");
  const moreUrl = useRef("");

  const loadMore = () => {
    if (moreUrl.current === "" || moreUrl.current == null) return;
    setLM(true);
    fetch(
      `https://app.ticketmaster.com${moreUrl.current}&apikey=${process.env.EXPO_PUBLIC_TM_KEY}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        moreUrl.current = res?._links?.next?.href;
        setData((v) =>
          v.concat(
            res._embedded.events.map((e: any) => ({
              id: e?.id,
              image: e?.images?.[0]?.url,
              title: e?.name,
              date: e?.dates?.start?.dateTime,
            })),
          ),
        );
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setLM(false);
      });
  };

  const renderItem = ({ item }: { item: Item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={[styles.item, isGrid && styles.gridItem]}
      onPress={() =>
        router.push({
          pathname: "/[id]",
          params: {
            id: item.id,
            title: item.title,
            image: item.image,
            date: item.date,
          },
        })
      }
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>
        <Fontisto name="date" size={12} color="gray" />
        {item.date}
      </Text>
    </TouchableOpacity>
  );

  useEffect(() => {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=${process.env.EXPO_PUBLIC_TM_KEY}`,
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        moreUrl.current = res?._links?.next?.href;
        setData(
          res._embedded.events.map((e: any) => ({
            id: e?.id,
            image: e?.images?.[0]?.url,
            title: e?.name,
            date: e?.dates?.start?.dateTime,
          })),
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          title: "Events",
          headerRight: () => (
            <TouchableOpacity
              style={[styles.switchBtn]}
              onPress={() => setIsGrid(!isGrid)}
            >
              <Text style={styles.bottomBtnText}>
                {isGrid ? "列表" : "网格"}
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ThemedView
        style={styles.container}
        lightColor="#f5f5f5"
        darkColor="#3f3f3fff"
      >
        {data.length === 0 ? (
          <ThemedView
            style={styles.loadingWrap}
            lightColor="#f5f5f5"
            darkColor="#3f3f3fff"
          >
            <ActivityIndicator size="large" color="#e57a09" />
            <Text style={styles.loadingText}>加载中…</Text>
          </ThemedView>
        ) : (
          <FlatList
            key={isGrid ? "grid" : "list"}
            data={data}
            keyExtractor={(item, id) => `${item.id}${id}`}
            renderItem={renderItem}
            numColumns={isGrid ? 2 : 1}
            contentContainerStyle={{ paddingBottom: 36 }}
            ListHeaderComponent={
              <HeaderSearch txt={searchTxt} setTxt={setST} search={search} />
            }
            ListFooterComponent={
              <TouchableOpacity
                style={[styles.loadMoreBtn, loadingMore && styles.disabledMore]}
                onPress={loadMore}
                disabled={loadingMore}
              >
                {loadingMore && <ActivityIndicator color="#fff" />}
                <Text style={styles.moreTxt}>加载更多</Text>
              </TouchableOpacity>
            }
          />
        )}
      </ThemedView>
    </>
  );

  function search() {
    fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?size=20&apikey=${process.env.EXPO_PUBLIC_TM_KEY}&keyword=${searchTxt}`,
    )
      .then((res) => res.json())
      .then((res) => {
        moreUrl.current = res?._links?.next?.href;
        setData(
          res._embedded.events.map((e: any) => ({
            id: e?.id,
            image: e?.images?.[0]?.url,
            title: e?.name,
            date: e?.dates?.start?.dateTime,
          })),
        );
      })
      .catch((e) => {
        console.error(e);
      });
  }
}

interface SearchProp {
  txt: string;
  setTxt: React.Dispatch<React.SetStateAction<string>>;
  search: () => void;
}

function HeaderSearch({ txt, setTxt, search }: SearchProp) {
  return (
    <View style={sStyles.searchBar}>
      <TextInput
        style={sStyles.input}
        onSubmitEditing={onSubmitEditing}
        onChangeText={onChangeNumber}
        value={txt}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TouchableOpacity style={sStyles.btn}>
        <Text>搜索</Text>
      </TouchableOpacity>
    </View>
  );

  function onSubmitEditing(val: TextInputSubmitEditingEvent) {
    search();
  }

  function onChangeNumber(val: string) {
    setTxt(val);
  }
}

const sStyles = StyleSheet.create({
  searchBar: {
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flex: 1,
  },
  btn: {
    width: 58,
  },
});

const ITEM_MARGIN = 8;
const GRID_ITEM_WIDTH = (width - ITEM_MARGIN * 3) / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loadingWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 12,
    color: "#999",
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
  image: {
    width: "100%",
    height: 120,
    borderRadius: 6,
    marginBottom: 8,
    backgroundColor: "#eee",
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
  },
  date: {
    fontSize: 12,
    color: "#a1a1a1ff",
    display: "flex",
    gap: 4,
    marginTop: 5,
  },

  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#fff",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#ddd",
  },
  loadMoreBtn: {
    margin: 16,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#e57a09",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  disabledMore: {
    backgroundColor: "#a8a8a8ff",
  },
  moreTxt: {
    color: "#fff",
  },
  switchBtn: {
    marginRight: 16,
  },
  bottomBtnText: {
    color: "#e57a09",
    fontSize: 15,
    fontWeight: "500",
  },
});
