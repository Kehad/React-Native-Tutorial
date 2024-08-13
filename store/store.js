import { configureStore } from "@reduxjs/toolkit";
import expenseSlice from "./expense-slice";


export const store = configureStore({
  reducer: {
    expensesGeneralList: expenseSlice,
  },
});
