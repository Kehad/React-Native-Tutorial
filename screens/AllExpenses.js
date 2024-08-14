import React from 'react'
import { Text } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { useSelector } from 'react-redux';

function AllExpenses() {
  const DUMMY_EXPENSESLIST = useSelector(
    (state) => state.expensesGeneralList.expensesGeneralList
  );
  return (
    <ExpensesOutput EXPENSES_LIST={DUMMY_EXPENSESLIST}  expensesPeriod="total" fallbackText="There's no expenses found" />
  )
}

export default AllExpenses