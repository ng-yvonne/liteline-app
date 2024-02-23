import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/Reducers';

const store = configureStore({
  reducer: rootReducer,
});

export default store;