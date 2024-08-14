import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import { setExpenses } from "../store/expense-slice";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function RecentExpenses() {
  const dispatch = useDispatch();
  console.log('Recent Expenses')
  const DUMMY_EXPENSESLIST = useSelector(
    (state) => state.expensesGeneralList.expensesGeneralList
  );

  const [isFetching, setIsFetching] = useState(true)
  const [error, setError] = useState(true);

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true)
      try {
        const expenses = await fetchExpenses();
        dispatch(setExpenses(expenses));
      } catch (error) {
        setError('Could not fetch expenses!')
      }
      setIsFetching(false)
    }

    getExpenses()
  }, []);

  function errorHandler() {
    setError(null)
  }

  if(error && !isFetching) {
    return <ErrorOverlay message={error}  />
  }
  if (isFetching) {
    return <LoadingOverlay />;
  }
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