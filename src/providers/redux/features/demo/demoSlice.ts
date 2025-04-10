import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {}

// Define the initial state using that type
const initialState: IInitialState = {};

export const ecommerceSlice = createSlice({
  name: 'ecommerce',
  // createSlice will infer the state type from the initialState argument
  initialState,
  reducers: {
    // eslint-disable-next-line no-unused-vars
    setEcommerce: (state, action: PayloadAction<any>) => {},
  },
});

export const { setEcommerce } = ecommerceSlice.actions;

export default ecommerceSlice.reducer;
