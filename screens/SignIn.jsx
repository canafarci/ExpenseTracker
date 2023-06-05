import React from "react";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import {
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  Text,
  View,
  Alert,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function SignInScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signIn() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      Alert.alert("Error", "Email and password are mandatory.", [
        { text: "OK" },
      ]);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
      Alert.alert("Error", error.message, [{ text: "OK" }]);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <Icon style={styles.icon} name="email" size={18} color="gray" />
            <TextInput
              placeholder="Email"
              value={value.email}
              style={styles.textInput}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
          </View>
          <View style={styles.input}>
            <Icon style={styles.icon} name="lock" size={18} color="gray" />
            <TextInput
              placeholder="Password"
              style={styles.textInput}
              className="flex-1 pt-2.5¬l pr-2.5 pb-2.5 pl-0"
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
        </View>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText} onPress={signIn}>
            Sign In
          </Text>
        </Pressable>
        <Text style={styles.footerText}>
          Don't Have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Sign Up")}
          >
            Sign Up
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  content: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: "80%",
    flexDirection: "column",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eee",
    marginBottom: 10,
  },
  icon: {
    padding: 10,
  },
  textInput: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: "#424242",
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  footerText: {
    color: "darkgray",
    fontSize: 16,
    textAlign: "center",
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});
