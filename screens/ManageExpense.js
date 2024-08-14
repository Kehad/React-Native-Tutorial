import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { GlobalStyles } from "../constants/styles";
import IconButton from "../components/UI/IconButton";
import {
  addExpenses,
  deleteExpenses,
  updateExpenses,
} from "../store/expense-slice";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import { deleteExpense, deleteExpenseApi, storeExpense, updateExpense, updateExpenseApi } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpense({ route, navigation, EXPENSES_LIST }) {
  const dispatch = useDispatch();
  const DUMMY_EXPENSESLIST = useSelector(
    (state) => state.expensesGeneralList.expensesGeneralList
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState();


  const editedExpenseId = route.params?.expenseId;
  const isEditing = !!editedExpenseId;

  const selectedExpense = DUMMY_EXPENSESLIST.find((expense) => expense.id === editedExpenseId)

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function cancelHandler() {
    navigation.goBack();
  }

  async function confirmHandler(expenseData) {
    setIsSubmitting(true); 
    try {
      if (isEditing) {
        dispatch(updateExpenses(expenseData)); // for redux store
        await updateExpenseApi(editedExpenseId, expenseData); // for backend store
      } else {
        // console.log(eenseData);
        const id = await storeExpense(expenseData)
        dispatch(addExpenses({expenseData, id:id}));
      }
      navigation.goBack();
    } catch (err) {
      setError('Could not save data - please try again later! ');
      setIsSubmitting(false);
    }
  }

  async function deleteExpenseHandler() {
    setIsSubmitting(true);
    try {
      await deleteExpense(editedExpenseId);
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
    } catch (error) {
      setError("Could not delete expense - please try again later!");
      setIsSubmitting(false);
    }
  }

  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} />;
  }
  if(isSubmitting) {
    return <LoadingOverlay />
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? "Update" : "Add"}
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        defaultValue={selectedExpense}
      />

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

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});
