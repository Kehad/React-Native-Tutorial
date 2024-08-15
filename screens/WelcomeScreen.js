import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { AuthContext } from "../store/auth-context";
import axios from "axios";

function WelcomeScreen() {
  const [fetchedMessage, setFetchedMesssage] = useState("");

  const authCtx = useContext(AuthContext);
  const token = authCtx.token;

  useEffect(() => {
    // .get(
    //   "https://reactnative-userauth-app-default-rtdb.firebaseio.com/message.json"
    // )
    //       {
    // "rules": {
    //   ".read": "now < 1726268400000",  // 2024-9-14 -- // default -read: now < 1726268400000
    //   ".write": "now < 1726268400000",  // 2024-9-14 -- // default -read: now < 1726268400000
    // }

    axios
      .get(
        "https://reactnative-userauth-app-default-rtdb.firebaseio.com/message.json?auth=" +
          token
      )
      .then((response) => {
        console.log(response.data, response);
        setFetchedMesssage(response.data);
      });
  }, [token]);
  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>You authenticated successfully!</Text>
      <Text>{fetchedMessage}</Text>
    </View>
  ); 
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
