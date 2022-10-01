import axios from "axios";

const BACKEND_URL =
  "https://expense-tracker-app-f16fa-default-rtdb.europe-west1.firebasedatabase.app/";

export async function storeExpense(expenseData) {
  const respose = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
  const id = respose.data.name;
  return id;
}

export async function fetchExpenses() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

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

export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
