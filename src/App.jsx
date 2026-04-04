import { useState } from "react";
import "./App.css";

function App() {

  // state for the expense name input
  const [expenseName, setExpenseName] = useState("");

  // state for the expense amount input
  const [amount, setAmount] = useState("");

  // state for the selected category
  const [category, setCategory] = useState("");

  // state to track which expense is being edited
  const [editingIndex, setEditingIndex] = useState(null);

  // state for displaying validation errors to the user
  const [error, setError] = useState("");

  // load saved expenses from localStorage when the app starts
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // calculate total expenses
  const total = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  // calculate totals by category
  const categoryTotals = expenses.reduce((totals, expense) => {
    if (!totals[expense.category]) {
      totals[expense.category] = 0;
    }
    totals[expense.category] += Number(expense.amount);
    return totals;
  }, {});

  // handles the form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // stop page refresh

    // validation: ensure all fields are filled out
    if (!expenseName || !amount || !category) {
      setError("Please fill out all fields");
      return;
    }

    // validation: ensure amount is greater than 0
    if (Number(amount) <= 0) {
      setError("Amount must be greater than 0");
      return;
    }

    // clear any previous error if inputs are valid
    setError("");

    let updatedExpenses;

    // if editing an existing expense
    if (editingIndex !== null) {
      updatedExpenses = [...expenses];

      // replace selected expense
      updatedExpenses[editingIndex] = {
        name: expenseName,
        amount: Number(amount),
        category: category
      };

      // exit editing mode
      setEditingIndex(null);

    } else {
      // create a new expense
      const newExpense = {
        name: expenseName,
        amount: Number(amount),
        category: category
      };

      updatedExpenses = [...expenses, newExpense];
    }

    // update state + localStorage
    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // clear form inputs
    setExpenseName("");
    setAmount("");
    setCategory("");
  };

  // delete a single expense
  const deleteExpense = (indexToDelete) => {
    const updatedExpenses = expenses.filter(
      (_, index) => index !== indexToDelete
    );

    setExpenses(updatedExpenses);
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };

  // clear all expenses
  const clearExpenses = () => {
    setExpenses([]);
    localStorage.removeItem("expenses");
  };

  // start editing an expense
  const startEdit = (index) => {
    const expense = expenses[index];

    setExpenseName(expense.name);
    setAmount(expense.amount);
    setCategory(expense.category);

    setEditingIndex(index);
  };

  return (
    <div className="container">

      <h1>Finance Tracker</h1>
      <p>Track your income and expenses.</p>

      {/* display validation error */}
      {error && <p>{error}</p>}

      {/* expense form */}
      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Expense name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Category</option>
          <option value="Food">Food</option>
          <option value="Housing">Housing</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        {/* dynamic button text */}
        <button type="submit">
          {editingIndex !== null ? "Update Expense" : "Add Expense"}
        </button>

        {/* cancel edit button */}
        {editingIndex !== null && (
          <button
            type="button"
            onClick={() => {
              setEditingIndex(null);
              setExpenseName("");
              setAmount("");
              setCategory("");
            }}
          >
            Cancel
          </button>
        )}

      </form>

      <h2>Expenses</h2>

      {/* empty state */}
      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        <ul>
          {expenses.map((expense, index) => (
            <li key={index}>
              {expense.name} - ${expense.amount} - {expense.category}

              <button onClick={() => startEdit(index)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => deleteExpense(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}

      <h3>Total: ${total}</h3>

      <button className="clear-btn" onClick={clearExpenses}>
        Clear All Expenses
      </button>

      <h2>Spending by Category</h2>

      <ul>
        {Object.entries(categoryTotals).map(([cat, amt]) => (
          <li key={cat}>
            {cat}: ${amt}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;