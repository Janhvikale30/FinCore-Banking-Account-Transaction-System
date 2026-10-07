import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TransactionHistory = () => {
  const nav = useNavigate();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accno = localStorage.getItem("accno");

    console.log("Transaction Account Number:", accno);

    if (!accno) {
      alert("Account number not found. Please login again.");
      nav("/login");
      return;
    }

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bank/viewhistory/${accno}`,
        );

        console.log("Transaction Response:", response.data);

        setTransactions(response.data);
      } catch (error) {
        console.log("Transaction History Error:", error);

        if (error.response) {
          alert(
            error.response.data?.message ||
              error.response.data ||
              "Unable to fetch transaction history",
          );
        } else {
          alert("Unable to connect to Spring Boot server.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("accno");
    localStorage.removeItem("username");

    nav("/login");
  };

  if (loading) {
    return <h2 style={{ padding: "30px" }}>Loading...</h2>;
  }

  return (
    <div className="bank-page">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">🏦</div>
          <span>OnlineBank</span>
        </div>

        <nav className="dashboard-nav">
          <button
            className="dashboard-nav-item"
            onClick={() => nav("/customer-dashboard")}
          >
            <span className="nav-icon">🏠</span>
            <span>Dashboard</span>
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/deposit")}
          >
            <span className="nav-icon">💰</span>
            <span>Deposit Money</span>
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/withdraw")}
          >
            <span className="nav-icon">💸</span>
            <span>Withdraw</span>
          </button>

          <button
            className="dashboard-nav-item active"
            onClick={() => nav("/transactions")}
          >
            <span className="nav-icon">📋</span>
            <span>Transaction History</span>
          </button>

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/profile")}
          >
            <span className="nav-icon">👤</span>
            <span>Profile</span>
          </button>
        </nav>

        <div className="dashboard-logout">
          <button
            className="dashboard-nav-item logout-item"
            onClick={handleLogout}
          >
            <span className="nav-icon">🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MAIN */}
      <main className="dashboard-main">
        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-welcome-small">Your banking activity</p>

            <h1>Transaction History 📋</h1>
          </div>

          <button className="profile-circle" onClick={() => nav("/profile")}>
            👤
          </button>
        </header>

        {/* TRANSACTION CARD */}
        <div className="transaction-history-card">
          <div className="transaction-heading">
            <div>
              <h2>Recent Transactions</h2>

              <p>Account No: {localStorage.getItem("accno")}</p>
            </div>
          </div>

          {transactions.length === 0 ? (
            <div className="no-transactions">
              <div>📋</div>
              <h3>No Transactions Found</h3>
              <p>Your deposit and withdrawal transactions will appear here.</p>
            </div>
          ) : (
            <div className="transaction-table-wrapper">
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Transaction ID</th>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Date & Time</th>
                  </tr>
                </thead>

                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.tid}>
                      <td>#{transaction.tid}</td>

                      <td>
                        <span
                          className={
                            transaction.traType === "Deposit"
                              ? "transaction-deposit"
                              : "transaction-withdraw"
                          }
                        >
                          {transaction.traType}
                        </span>
                      </td>

                      <td>
                        ₹
                        {Number(transaction.traAmount).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                        })}
                      </td>

                      <td>{transaction.traDate}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TransactionHistory;
