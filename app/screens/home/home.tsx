import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Appbar,
  Button,
  Card,
  Chip,
  IconButton,
  MD3Colors,
  ProgressBar,
  useTheme,
} from 'react-native-paper';
import CardItem from '../../components/cardItem';
import { componentNavigationProps } from '../../types/navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { styles } from './styles';
import { ConnectedProps, connect, useDispatch } from 'react-redux';
import { RootState } from '../../redux';
import { getNews, getOldNews } from '../../api/news/news.api';
import { newsActions } from '../../redux/slices/news/news.slice';

type ReduxProps = ConnectedProps<typeof connector>;

const categories = ['World', 'Business', 'Science', 'Health', 'Sports'];

const Home = (props: componentNavigationProps & ReduxProps) => {
  const {
    news, // Use newsData from Redux
  } = props;

  const theme = useTheme();
  const dispatch = useDispatch();

  const [newsData, setNewsData] = useState<newsData[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all-sections');
  const [endReached, setEndReached] = useState(false);
  const [isloadign, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // State for the search query
  const [filteredNewsData, setFilteredNewsData] = useState<newsData[]>([]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredData = newsData.filter(item =>
      item.title.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredNewsData(filteredData);
  };

  const handleCategoryChange = (category: React.SetStateAction<string>) => {
    const isCurrentlySelected = selectedCategory === category;
    setSelectedCategory(isCurrentlySelected ? 'all-sections' : category);
  };

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      setEndReached(false);
      const response = await getNews(selectedCategory);
      dispatch(newsActions.setNews(response?.data?.results));
      setNewsData(response?.data?.results);
      setFilteredNewsData(response?.data?.results);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOnEndReached = async () => {
    if (!endReached) {
      setIsLoading(true);
      try {
        const response = await getOldNews(selectedCategory);
        setFilteredNewsData(prevNewsData => [
          ...prevNewsData,
          ...response?.data?.results,
        ]);
        setNewsData(prevNewsData => [
          ...prevNewsData,
          ...response?.data?.results,
        ]);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
        setEndReached(true);
      }
    }
  };

  useEffect(() => {
    if (Object.keys(news?.news || {}).length > 1) {
      const initialNewsData = Object.values(news?.news);
      setNewsData(initialNewsData);
      setFilteredNewsData(initialNewsData);
    }
  }, [news]);

  return (
    <View style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Home "></Appbar.Content>
      </Appbar.Header>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title"
          onChangeText={handleSearch}
          value={searchQuery}
        />
        <View style={styles.searchIconContainer}>
          <IconButton
            icon={() => <Icon name="search" size={20} color="gray" />}
            onPress={() => {}}
            style={styles.searchIcon}
          />
        </View>
      </View>
      <View style={styles.filtersContainer}>
        {categories?.map(cat => (
          <Chip
            key={cat}
            mode="outlined"
            style={styles.chipItem}
            textStyle={{ fontWeight: '400', color: 'black', padding: 1 }}
            showSelectedOverlay
            onPress={() => handleCategoryChange(cat)}
            selected={selectedCategory === cat}>
            {cat}
          </Chip>
        ))}
        <Button
          mode="elevated"
          style={styles.button}
          labelStyle={{
            fontSize: 14,
            margin: 'auto',
            color: theme.colors.primary,
          }}
          icon={'sync'}
          onPress={handleRefresh}>
          Refresh
        </Button>
      </View>
      <ProgressBar
        visible={isloadign}
        indeterminate
        color={MD3Colors.error50}
      />
      <FlatList
        keyExtractor={(item: any) => item.id}
        onEndReached={handleOnEndReached}
        style={styles?.flatList}
        data={filteredNewsData}
        renderItem={({ item }) => (
          <CardItem
            navigation={props.navigation}
            section={item?.section}
            abstract={item?.abstract}
            title={item?.title}
            published_date={item?.published_date}
            source={item?.source}
            media={item?.media}
            url={item?.url}
            adx_keywords={item?.adx_keywords}
            id={item?.id}
            column={item?.column}
            byline={item?.byline}
          />
        )}
      />
    </View>
  );
};

const mapDispatch = {
  setNews: newsActions.setNews,
};

const mapState = (state: RootState) => ({
  news: state.news,
});

const connector = connect(mapState, mapDispatch);
const AppRedux = connector(Home);

export { AppRedux as Home };
