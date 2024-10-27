// src/redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import laboratoryReducer from './laboratorySlice';

const store = configureStore({
    reducer: {
        laboratories: laboratoryReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
