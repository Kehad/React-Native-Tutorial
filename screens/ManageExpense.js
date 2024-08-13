import { useLayoutEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import {
  addExpenses,
  deleteExpenses,
  updateExpenses,
} from "../store/expense-slice";
import { generateRandomText } from "../util/date";

function ManageExpense({ route, navigation, EXPENSES_LIST }) {
  const dispatch = useDispatch();
  const DUMMY_EXPENSESLIST = useSelector(
    (state) => state.expensesGeneralList.expensesGeneralList
  );
  const editedExpenseId = route.params?.expenseId;
  const filteredIten = DUMMY_EXPENSESLIST.filter(
    (expense) => expense.id === editedExpenseId
  );
  const isEditing = !!editedExpenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing) {
      const randomText = generateRandomText(10);
      ;
      let editExpense = {
        description: "Test",
        amount: 19.99,
        date: new Date("2022-05-19"),
        id: randomText,
        oldId: editedExpenseId,
      };
      dispatch(updateExpenses(editExpense));
    } else {
      const randomText = generateRandomText(10);
      
      let newExpense = {
        description: "Test!!!!",
        amount: 29.99,
        date: new Date("2022-05-20"),
        id: randomText,
      };
      dispatch(addExpenses(newExpense));
    }
    navigation.goBack();
  }

  function deleteExpenseHandler() {
    navigation.goBack();
    dispatch(deleteExpenses(editedExpenseId));
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
