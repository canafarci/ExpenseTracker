import { View, Text, StyleSheet, TextInput } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { useState } from "react";

function Input({ label, textInputConfig, style, invalid }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }

  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: GlobalStyles.colors.subheaderTextColor,
  },
  input: {
    backgroundColor: "beige",
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
    color: "gray",
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: "lightpink",
  },
});
