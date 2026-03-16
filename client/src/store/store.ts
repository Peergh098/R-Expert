import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from './baseApi';

// Import side-effect files so their endpoints get injected into baseApi
import './authApi';
import './submissionsApi';
import './contactApi';

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
