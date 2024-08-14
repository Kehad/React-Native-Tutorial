import axios from 'axios';

const BACKEND_URL =
  "https://reactnative-expensetracker-app-default-rtdb.firebaseio.com";

export async function storeExpense(expenseData) {
    const response = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    const id = response.data.name;
    return id;
    // axios.post(BACKEND_URL, expenseData);
}


export async function fetchExpenses(expenseData) {
    const response = await axios.get(
        BACKEND_URL + '/expenses.json'
    );

    const expenses = [];
    console.log('response0000000000000000000000000000000000000')
    console.log(response.data);
    for (const key in response.data) {
        console.log(key);
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description
        };
        expenses.push(expenseObj);
    }
    // console.log(expenses);

    return expenses;
} 