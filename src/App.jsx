import { useState } from "react";

function App() {

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [expenses, setExpenses] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      name: expenseName,
      amount: amount
    };

    setExpenses([...expenses, newExpense]);

    setExpenseName("");
    setAmount("");
  };

  return (
    <div>
      <h1>Finance Tracker</h1>
      <p>Track your income and expenses.</p>

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

        <button type="submit">Add Expense</button>
      </form>

      <h2>Expenses</h2>

      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.name} - ${expense.amount}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;