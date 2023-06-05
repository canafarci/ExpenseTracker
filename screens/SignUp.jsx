import React from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Pressable,
  Alert,
} from "react-native";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { StackScreenProps } from "@react-navigation/stack";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

function SignUpScreen({ navigation }) {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
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
      await createUserWithEmailAndPassword(auth, value.email, value.password);
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
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Sign Up</Text>
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
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
          </View>
        </View>

        <Pressable style={styles.button} onPress={signUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </Pressable>

        <Text style={styles.footerText}>
          Have an account?{" "}
          <Text
            style={styles.link}
            onPress={() => navigation.navigate("Sign In")}
          >
            Sign In
          </Text>
        </Text>
      </View>
    </View>
  );
}

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  contentContainer: {
    marginHorizontal: 16,
    height: "85%",
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "darkgray",
    marginTop: 20,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 20,
    width: "80%",
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#eee",
    marginVertical: 5,
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
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
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
