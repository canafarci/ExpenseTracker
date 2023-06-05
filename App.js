import "./firebaseConfig";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ManageExpense from "./screens/ManageExpense";
import RecentExpenses from "./screens/RecentExpenses";
import AllExpenses from "./screens/AllExpenses";
import { GlobalStyles } from "./constants/styles";
import { MaterialIcons } from "@expo/vector-icons";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import { useAuth } from "./hooks/useAuth";
import AuthStack from "./components/Auth/AuthStack";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();

function ExpensesOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={({ navigation }) => ({
        headerTitleAlign: "center",
        headerStyle: { backgroundColor: GlobalStyles.colors.header },
        headerTintColor: GlobalStyles.colors.headerFont,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.bottomTabColor },
        tabBarActiveTintColor: "maroon",
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => {
              navigation.navigate("ManageExpense");
            }}
          />
        ),
      })}
    >
      <BottomTabs.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          headerTitle: "Recent Expenses",
          tabBarLabel: "Recent Expenses",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="hourglass-bottom" color={color} size={size} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          headerTitle: "All Expenses",
          tabBarLabel: "All Expenses",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="money" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

function UserStack() {
  return (
    <ExpensesContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTitleAlign: "center",
            headerStyle: { backgroundColor: GlobalStyles.colors.header },
            headerTintColor: GlobalStyles.colors.headerFont,
          }}
        >
          <Stack.Screen
            name="ExpensesOverview"
            component={ExpensesOverview}
            options={{ headerShown: false, headerTitle: "Expenses Overview" }}
          />
          <Stack.Screen
            name="ManageExpense"
            component={ManageExpense}
            options={{ presentation: "modal" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ExpensesContextProvider>
  );
}

function RootNav() {
  const { user } = useAuth();
  return user ? <UserStack /> : <AuthStack />;
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <RootNav />
    </>
  );
}
