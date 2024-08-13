import React from "react";
import { StyleSheet, Text, View } from "react-native";
import ExpensesSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../constants/styles";
import { useSelector } from "react-redux";

function ExpensesOutput({ EXPENSES_LIST, expensesPeriod, fallbackText}) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (EXPENSES_LIST.length > 0) {
    content = <ExpensesList expenses={EXPENSES_LIST} />;
  }

  return (
    <View style={styles.container}>
      <ExpensesSummary expenses={EXPENSES_LIST} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 0,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
