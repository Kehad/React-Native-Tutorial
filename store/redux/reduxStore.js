//store.jsx
import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favorites-slice";

export const store = configureStore({ 
  reducer: {
    favoritesMeals: favoritesReducer,
  },
});
