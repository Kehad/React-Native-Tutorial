import { FlatList, Text } from "react-native";
import ExpenseItem from "./ExpenseItem";

function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
//   return <Text>{itemData.item.description}</Text>;
}

function ExpensesList({ expenses }) {
  return (
    <FlatList
      data={expenses}
      keyExtractor={(item) => item.id}
      //   renderItem={(itemData) => <Text>{itemData.item.description}</Text>}
        renderItem={renderExpenseItem}
    />
  );
}

export default ExpensesList;
