import { View, Text, StyleSheet, TextInput, Alert } from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";
import DateTimePicker from "@react-native-community/datetimepicker";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [modalDate, setModalDate] = useState(new Date());
  const [settingDate, setSettingDate] = useState(false);

  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setModalDate(currentDate);
  };

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputs((curInputs) => {
      return {
        ...curInputs,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      //show feedback
      //Alert.alert("Invalid input", "Plz check input values");
      setInputs((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          description: {
            value: curInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputs.amount.isValid ||
    !inputs.date.isValid ||
    !inputs.description.isValid;

  function datePickHandler() {
    setSettingDate(true);
  }

  function dateButtonHandler() {
    inputChangedHandler("date", getFormattedDate(modalDate));
    setSettingDate(false);
  }

  function lastButtons() {
    return (
      <>
        {formIsInvalid && (
          <Text style={styles.errorText}>Invalid inputs please recheck</Text>
        )}
        <View style={styles.buttons}>
          <Button style={styles.button} mode="flat" onPress={onCancel}>
            Cancel
          </Button>
          {!settingDate && (
            <Button style={styles.button} onPress={submitHandler}>
              {submitButtonLabel}
            </Button>
          )}
        </View>
      </>
    );
  }

  if (settingDate) {
    return (
      <View style={styles.dateContainer}>
        <DateTimePicker
          testID="dateTimePicker"
          value={modalDate}
          mode={"date"}
          is24Hour={true}
          onChange={onDateChange}
          display="spinner"
        />
        <View style={styles.setButton}>
          <Button onPress={dateButtonHandler}>Set Date</Button>
        </View>
        {lastButtons()}
      </View>
    );
  }

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          label="Amount"
          style={styles.rowInput}
          invalid={!inputs.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          label="Date"
          style={styles.rowInput}
          invalid={!inputs.date.isValid}
          textInputConfig={{
            onPressIn: datePickHandler,
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            autoCorrect: false,
            onChangeText: inputChangedHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        label="Description"
        invalid={!inputs.description.isValid}
        textInputConfig={{
          multiline: true,
          autoCapitalize: "sentences",
          onChangeText: inputChangedHandler.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      {lastButtons()}
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 150,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    color: "ivory",
  },
  setButton: { flex: 1, minWidth: "70%", margin: 50 },
  form: {
    marginTop: 25,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "maroon",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
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
  errorText: {
    textAlign: "center",
    color: "firebrick",
    margin: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});
