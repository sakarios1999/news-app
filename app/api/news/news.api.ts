import axios from 'axios';

/** Get all cards issued by areeba */
export const getNews = async (selectedCategory: string = '') => {
  return axios.get(
    `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${selectedCategory.toLowerCase()}/7.json?api-key=${
      process.env.EXPO_PUBLIC_API_KEY
    }`,
  );
};

export const getOldNews = async (selectedCategory: string = '') => {
  return axios.get(
    `https://api.nytimes.com/svc/mostpopular/v2/mostviewed/${selectedCategory.toLowerCase()}/30.json?api-key=${
      process.env.EXPO_PUBLIC_API_KEY
    }`,
  );
};
