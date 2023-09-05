import { createSlice } from '@reduxjs/toolkit';
import { newsData } from './news.type';

const initialState = {
  news: [{}] as newsData[],
};

const newsSlice = createSlice({
  name: 'news',
  initialState: initialState,
  reducers: {
    setNews: (state, action) => {
      // Update the state with the new news data
      state.news = { ...state.news, ...action.payload };
    },

    updateNews: (state, action) => {
      // if (!isEmpty(state.news[action.payload.index])) {
      //   state.news[action.payload.index] = action.payload.card;
      // }
    },

    removeNews: (state, action) => {
      // if (state.news.length > 1) {
      //   removeElement(
      //     state.news,
      //     (element: Card) => element.id === action.payload.id,
      //   );
      //   state.defaultCardNumber = state.news[0].maskedCardNumber;
      // }
      // return state;
    },

    removeManyNews: (state, action) => {
      // if (action.payload.length) {
      //   action.payload.map((card: Card) => {
      //     if (state.news.length > 1) {
      //       removeElement(
      //         state.news,
      //         (element: Card) => element.id === card.id,
      //       );
      //       state.defaultCardNumber = state.news[0].maskedCardNumber;
      //     }
      //   });
      // }
      // return state;
    },

    addNews: (state, action) => {
      // state..push(action.payload);
    },

    reset: () => initialState,
  },
});

export const newsReducer = newsSlice.reducer;
export const newsActions = { ...newsSlice.actions };
