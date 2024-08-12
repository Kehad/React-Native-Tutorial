
import { StyleSheet, FlatList, View } from "react-native";

import { CATEGORIES, MEALS } from "../data/dummy-data";
//  import MealItem from "../components/MealItem";
import { useLayoutEffect } from "react";
import MealsList from "../components/MealList/MealList";

function MealsOverviewScreen({ route, navigation}) {
  const catId = route.params.categoryId;
  console.log(route, route.params, catId)

  const displayedMeals = MEALS.filter((mealItem) => {
    return mealItem.categoryIds.indexOf(catId) >= 0;
  });

  useLayoutEffect(() => {
    const categoryTitle = CATEGORIES.find(
      (category) => category.id == catId
    ).title;
 
    navigation.setOptions({
      title: categoryTitle,
    });
  }, [catId, navigation]);
  
  // function detailsHandler() {
  //   navigation.navigate("MealDetails", {
  //     categoryId: itemData.item.id,
  //   });
  // }

  return <MealsList items={displayedMeals} />
}

export default MealsOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
