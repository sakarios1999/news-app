import { Animated, Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Card, useTheme } from "react-native-paper";
import { NavigationProp } from "@react-navigation/native";
import { Feather, FontAwesome } from "@expo/vector-icons";

type navigationProp = {
  navigation: NavigationProp<any>;
};

const CardItem = (props: newsData & navigationProp) => {
  const theme = useTheme();
  const [scaleAnimation] = useState(new Animated.Value(1));

  const handlePress = () => {
    Animated.spring(scaleAnimation, {
      toValue: 0.95,
      useNativeDriver: false,
    }).start();
    setTimeout(() => {
      Animated.spring(scaleAnimation, {
        toValue: 1,
        useNativeDriver: false,
      }).start();
    }, 100);

    props.navigation.navigate("NewsOverview", {
      title: props.title,
      abstract: props.abstract,
      section: props.section,
      published_date: props.published_date,
      source: props.source,
      media: props.media,
      url: props.url,
      adx_keywords: props.adx_keywords,
      id: props.id,
      column: props.column,
      image: mediaUrl,
      byline: props.byline,
    });
  };
  let mediaUrl = "";

  const mediaWithFormat = props.media.find((item) =>
    item["media-metadata"].some((meta) => meta.format === "mediumThreeByTwo440")
  );

  if (mediaWithFormat) {
    const matchingMetadata = mediaWithFormat["media-metadata"].find(
      (meta) => meta.format === "mediumThreeByTwo440"
    );
    if (matchingMetadata != undefined) {
      mediaUrl = matchingMetadata.url;
    }
  } else if (props.media.length > 0) {
    const lastMetadataIndex =
      props.media[props.media.length - 1]["media-metadata"].length - 1;
    mediaUrl =
      props.media[props.media.length - 1]["media-metadata"][lastMetadataIndex]
        .url;
  } else {
    mediaUrl =
      "https://www.zoofans.com/Content/common/dist/images/news-placeholder.png";
  }

  return (
    <Pressable onPress={handlePress}>
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.colors.elevation.level5,
            transform: [{ scale: scaleAnimation }],
          },
        ]}
      >
        <Card
          style={{
            marginVertical: 10,
            backgroundColor: theme.colors.elevation.level5,
          }}
        >
          <Card.Cover borderRadius={10} source={{ uri: mediaUrl }} />
          <View style={styles.tagContainer}>
            <Text style={styles.tagText}>{props.published_date}</Text>
            <FontAwesome name="calendar" size={16} color="gray" />
          </View>
          <View style={styles.publisherContainer}>
            <Feather name="edit-2" size={16} color="gray" />
            <Text style={styles.publisherText}>
              {props.byline
                ? props.byline.trim().split(/\s+/).slice(0, 3).join(" ") +
                  (props.byline.split(" ").length > 3 ? "..." : "")
                : "Unknown"}
            </Text>
          </View>
          <Card.Title
            title={props.title}
            subtitle={props.abstract.split("\n")[0]}
            titleNumberOfLines={1}
            titleVariant="titleMedium"
          ></Card.Title>
        </Card>
      </Animated.View>
    </Pressable>
  );
};

export default CardItem;

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden", // Clip child elements to the card's border
  },
  tagContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  tagText: {
    marginRight: 5,
    fontSize: 12,
  },
  publisherContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.7)", // Transparent white background
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "gray",
  },
  publisherText: {
    marginLeft: 5,
    fontSize: 12,
    fontStyle: "italic",
  },
});
