import { useState } from "react";

function App() {

  // state for the expense name input
  const [expenseName, setExpenseName] = useState("");

  // state for the expense amount input
  const [amount, setAmount] = useState("");

  // state for the selected category
  const [category, setCategory] = useState("");

  // load saved expenses from localStorage when the app starts
  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses");
    return saved ? JSON.parse(saved) : [];
  });

  // calculate total expenses using reduce
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
    e.preventDefault(); // prevents page refresh

    // create a new expense object
    const newExpense = {
      name: expenseName,
      amount: amount,
      category: category
    };

    // update the expense list
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    // save updated expenses to localStorage
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));

    // reset input fields after submission
    setExpenseName("");
    setAmount("");
    setCategory("");
  };
  // remove an expense from the list
  const deleteExpense = (indexToDelete) => {

    const updatedExpenses = expenses.filter(
      (_, index) => index !== indexToDelete
    );
  
    setExpenses(updatedExpenses);
  
    // update localStorage after deleting
    localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  };
// clear all expenses
const clearExpenses = () => {
  setExpenses([]);
  localStorage.removeItem("expenses");
};
  return (
    <div className="container">

      <h1>Finance Tracker</h1>
      <p>Track your income and expenses.</p>

      {/* expense input form */}
      <form onSubmit={handleSubmit}>

        {/* expense name input */}
        <input
          type="text"
          placeholder="Expense name"
          value={expenseName}
          onChange={(e) => setExpenseName(e.target.value)}
        />

        {/* expense amount input */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* category dropdown */}
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

        <button type="submit">Add Expense</button>

      </form>

      <h2>Expenses</h2>
      

      {/* list of expenses */}
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - ${expense.amount} - {expense.category}
            <button onClick={() => deleteExpense(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>

      {/* total spending */}
      <h3>Total: ${total}</h3>
      <button onClick={clearExpenses}>
  Clear All Expenses
</button>
      <h2>Spending by Category</h2>

      <ul>
        {Object.entries(categoryTotals).map(([category, amount]) => (
        <li key={category}>
          {category}: ${amount}
        </li>
  ))}
    </ul>
      <h3>Total: ${total}</h3>

    </div>
  );
}

export default App;