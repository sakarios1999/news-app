import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";
import React from "react";

const DetailsCard = (props: newsData) => {
  const theme = useTheme();
  return (
    <ScrollView>
      <Text
        style={{ color: "black", marginVertical: 10 }}
        variant="headlineMedium"
      >
        {props?.title}
      </Text>
      <Card
        style={{ backgroundColor: theme.colors.background }}
        contentStyle={{ width: Dimensions.get("window").width }}
      >
        {props.image && <Card.Cover source={{ uri: props.image }}></Card.Cover>}
        <Card.Content>
          <Text
            variant="bodyLarge"
            textBreakStrategy="highQuality"
            style={{ textAlign: "left", marginVertical: 10 }}
          >
            {props.abstract}
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({});
