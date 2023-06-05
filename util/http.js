import axios from "axios";
import { Keys } from "../constants/keys";
import { getAuth, getIdToken } from "firebase/auth";

const BACKEND_URL = Keys.BACKEND_URL;

export async function storeExpense(expenseData) {
  const user = getAuth().currentUser;
  const idToken = await getIdToken(user, true);

  const respose = await axios.post(
    BACKEND_URL + "/expenses.json?auth=" + idToken,
    expenseData
  );
  const id = respose.data.name;
  return id;
}

export async function fetchExpenses() {
  const user = getAuth().currentUser;
  const idToken = await getIdToken(user, true);

  const response = await axios.get(
    BACKEND_URL + "/expenses.json?auth=" + idToken
  );

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };

    expenses.push(expenseObj);
  }

  return expenses;
}

export async function updateExpense(id, expenseData) {
  const user = getAuth().currentUser;
  const idToken = await getIdToken(user, true);
  return axios.put(
    BACKEND_URL + `/expenses/${id}.json?auth=${idToken}`,
    expenseData
  );
}

export async function deleteExpense(id) {
  const user = getAuth().currentUser;
  const idToken = await getIdToken(user, true);
  return axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=${idToken}`);
}
