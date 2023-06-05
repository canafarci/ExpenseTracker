import React from "react";
import { Text, Pressable, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet } from "react-native";

function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.text}>Track your expenses</Text>
        <Text style={styles.description}>
          An app to periodically check and save your expenses
        </Text>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Sign In")}
          >
            <Text style={styles.buttonText}>Sign In</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("Sign Up")}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 4,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    color: "slategray",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginHorizontal: 6,
  },
  description: {
    color: "darkgray",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 4,
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});
