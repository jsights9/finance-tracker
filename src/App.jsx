import { useState } from "react";

function App() {

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Expense:", expenseName, "Amount:", amount);
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

    </div>
  );
}

export default App;