// features/counter/counterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 59.99,
    date: new Date("2021-08-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2024-08-09"),
  },
  {
    id: "e3",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-08-12"),
  },
  {
    id: "e4",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A pair of trousers",
    amount: 89.29,
    date: new Date("2022-01-05"),
  },
  {
    id: "e7",
    description: "Some bananas",
    amount: 5.99,
    date: new Date("2021-12-01"),
  },
  {
    id: "e8",
    description: "A book",
    amount: 14.99,
    date: new Date("2022-02-19"),
  },
  {
    id: "e9",
    description: "Another book",
    amount: 18.59,
    date: new Date("2022-02-18"),
  },
];

export const ExpensesSlice = createSlice({
  name: "Expenses",
  initialState: {
    expensesGeneralList: DUMMY_EXPENSES,
  },
  reducers: {
    addExpenses: (state, action) => {
      state.expensesGeneralList.push(action.payload);
    },

    deleteExpenses: (state, action) => {
        //   state.expensesGeneralList.splice(state.expensesGeneralList.indexOf(action.payload.id), 1);
        // console.log(state.expensesGeneralList.slice(expense => expense.id !== action.payload));
      state.expensesGeneralList = state.expensesGeneralList.filter(expense => expense.id !== action.payload);
        // console.log(action.payload)
      },
    
    updateExpenses: (state, action) => {
      // let oldExpenseList = state.expensesGeneralList.filter(
      //   (expense) => expense.id !== action.payload.oldId
      // );
      // let newExpense = {
      //   description: action.payload.description,
      //   amount: action.payload.amount,
      //   date: action.payload.date,
      //   id: action.payload.id
      // }  
      //   let NewExpenseList = [...oldExpenseList, newExpense]
      //   state.expensesGeneralList = NewExpenseList       
      // const updatableExpenseIndex = state.expensesGeneralList.findIndex(
      //   (expense) => expense.id === action.payload.oldId
      //   );
      //   let newList = state.expensesGeneralList[updatableExpenseIndex];
      //   console.log(newList)
      // console.log(updatableExpenseIndex);  
      let newExpense = {
        description: action.payload.description,
        amount: action.payload.amount,
        date: action.payload.date,
        id: action.payload.id
      }  
      state.expensesGeneralList = state.expensesGeneralList.map(expense =>
        expense.id === action.payload.oldId
          ? { ...expense, ...newExpense }
          : expense
      );
    }
  },
});

export const { addExpenses, deleteExpenses, updateExpenses } = ExpensesSlice.actions;

export default ExpensesSlice.reducer;
