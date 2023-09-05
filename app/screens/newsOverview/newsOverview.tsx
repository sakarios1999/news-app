import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { componentNavigationProps } from '../../types/navigation';
import DetailsCard from '../../components/detailsCard';
import { styles } from './styles';

const NewsOverview = (props: componentNavigationProps) => {
  const {
    title,
    abstract,
    section,
    published_date,
    source,
    media,
    url,
    adx_keywords,
    id,
    column,
    byline,
    image,
  } = props?.route?.params as newsData;

  return (
    <View style={styles.Container}>
      <DetailsCard
        title={title}
        abstract={abstract}
        published_date={published_date}
        url={url}
        adx_keywords={adx_keywords}
        id={id}
        column={column}
        media={media}
        section={section}
        source={source}
        image={image}
      />
      <Text style={styles.publishedInfo}>Published on: {published_date}</Text>
      <Text style={styles.authorInfo}>
        Author: <Text style={{ fontStyle: 'italic' }}>{byline}</Text>
      </Text>
    </View>
  );
};

export default NewsOverview;
