// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { storeExpense } from "../util/http";


export const ExpensesSlice = createSlice({
  name: "Expenses",
  initialState: {
    expensesGeneralList: [],
  },
  reducers: {
    addExpenses: (state, action) => {
      state.expensesGeneralList.push(action.payload);
    },

    deleteExpenses: (state, action) => {
      state.expensesGeneralList = state.expensesGeneralList.filter(
        (expense) => expense.id !== action.payload
      );
    },
    setExpenses: (state, action) => {
      // console.log('action.payload');
      // console.log(action.payload);
      // console.log('action.payload');
      const inverted = action.payload.reverse();
      // state.expensesGeneralList.push(inverted);
      state.expensesGeneralList= (action.payload);
    },
    updateExpenses: (state, action) => {
      let newExpense = { 
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
        id: action.payload.id,
      };
      state.expensesGeneralList = state.expensesGeneralList.map((expense) =>
        expense.id === action.payload.oldId
          ? { ...expense, ...newExpense }
          : expense
      );
    },
  },
});

export const { addExpenses, deleteExpenses, updateExpenses , setExpenses} =
  ExpensesSlice.actions;

export default ExpensesSlice.reducer;
