import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expense-slice";


function RecentExpenses() {
  const dispatch = useDispatch();
  console.log('Recent Expenses')
  const DUMMY_EXPENSESLIST = useSelector(
    (state) => state.expensesGeneralList.expensesGeneralList
  );

  useEffect(() => {
    async function getExpenses() {
      const expenses = await fetchExpenses();
      // console.log('Expense')
      // console.log(expenses)
      // console.log('Expensue')
      dispatch(setExpenses(expenses));
    }

    getExpenses()
  }, []);

  // console.log('dummy')
  // console.log(DUMMY_EXPENSESLIST)
  // console.log('dummy')

  const recentExpenses = DUMMY_EXPENSESLIST.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date >= date7DaysAgo && expense.date <= today;
  });
  return (
    <ExpensesOutput
      EXPENSES_LIST={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpenses