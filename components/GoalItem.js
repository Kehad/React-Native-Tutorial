import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

function GoalItem(props) {
  function onDeleteGoalHandler() {
    props.onDeleteItem(props.id);
  }

  return (
    // <Pressable onPress={onDeleteGoalHandler}> // use with function onDeletedGoalHandler
    <View style={styles.goalItem}>
      <Pressable
        android_ripple={{ color: "#dddd" }}
        onPress={props.onDeleteItem.bind(this, props.id)}
        style={({ pressed }) => pressed && styles.pressedItem}
      >
        <Text style={styles.goalText}>{props.text}</Text>
      </Pressable>
    </View>
  );
}

export default GoalItem;

const styles = StyleSheet.create({
  goalItem: {
    margin: 8.0,
    borderRadius: 6,
    backgroundColor: "#5e0acc",
  },
  pressedItem: {
    opacity: 0.5,
  },
  goalText: {
    color: "#fff",
    padding: 8,
  },
});
