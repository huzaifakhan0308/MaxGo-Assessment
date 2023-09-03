import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  listings: [],
  status: 'idle',
  error: null,
};

export const fetchProperties = createAsyncThunk('listings/fetchProperties', async () => {
  try {
    const res = await axios.get('https://maxgo-assessment-backend.onrender.com/properties');
    const { data } = res;
    return data;
  } catch (error) {
    return error.message;
  }
});

const listingsSlice = createSlice({
  name: 'listings',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchProperties.pending, (state) => ({
        ...state,
        status: 'loading',
      }))
      .addCase(fetchProperties.fulfilled, (state, { payload }) => ({
        ...state,
        listings: payload,
        status: 'loaded',
      }))
      .addCase(fetchProperties.rejected, (state, { error }) => ({
        ...state,
        status: 'failed',
        error: error.message,
      }));
  },
});

export default listingsSlice.reducer;
