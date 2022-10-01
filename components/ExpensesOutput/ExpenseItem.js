import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GlobalStyles } from "../../constants/styles";
import { getFormattedDate } from "../../util/date";

function ExpenseItem({ description, amount, date, id }) {
  const navigation = useNavigation();

  function expensePressHandler() {
    navigation.navigate("ManageExpense", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{amount.toFixed(2)}₺</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpenseItem;
const styles = StyleSheet.create({
  pressed: { opacity: 0.75 },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.expenseItem,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 12,
    elevation: 2,
    shadowColor: "black",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.15,
  },
  textBase: {
    color: GlobalStyles.colors.expenseItemText,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "beige",
    justifyContent: "center",
    alignItems: "center",
    minWidth: 80,
    borderRadius: 4,
    borderBottomColor: "tomato",
    borderBottomWidth: 1,
  },
  amountText: {
    color: GlobalStyles.colors.subheaderTextColor,
    fontWeight: "bold",
  },
});
