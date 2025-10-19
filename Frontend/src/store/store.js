import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import { encryptTransform } from 'redux-persist-transform-encrypt';
import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './authSlice';

// Persist config for auth
const authPersistConfig = {
    key: 'auth',
    storage: storageSession, // Use sessionStorage instead of localStorage
    whitelist: ['user', 'tokens', 'isAuthenticated'],
    transforms: [
      encryptTransform({
        secretKey: 's3cureKey_123456', // change this to a random strong string
        onError: (err) => {
          console.error('Redux Persist Encryption Error:', err);
        },
      }),
    ],
  };
  
// Root reducer
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
});

// Configure store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);
