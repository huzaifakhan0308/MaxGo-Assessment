import { configureStore } from '@reduxjs/toolkit';
import listingsSlice from './listings/listingsSlice';

const store = configureStore({
  reducer: {
    listings: listingsSlice,
  },
});

export default store;
