import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../redux/counter/counterSlicer';
import basketReducer from '../redux/basket/basketSlicer';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketReducer,
  },
  
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;