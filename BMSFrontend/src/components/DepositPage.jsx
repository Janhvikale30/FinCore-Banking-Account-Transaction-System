import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const DepositPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  // Fetch current account details
  useEffect(() => {
    const accno = localStorage.getItem("accno");

    console.log("Deposit Account Number:", accno);

    if (!accno) {
      alert("Account number not found. Please login again.");
      nav("/login");
      return;
    }

    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bank/account/${accno}`,
        );

        console.log("Account Details:", response.data);

        setAccount(response.data);
        setBalance(Number(response.data.balance) || 0);

        // Keep latest account information
        localStorage.setItem("account", JSON.stringify(response.data));
      } catch (error) {
        console.log("Account Fetch Error:", error);

        alert(
          error.response?.data?.message || "Unable to fetch account details",
        );
      }
    };

    fetchAccount();
  }, [nav]);

  // Deposit money
  const handleDeposit = async (data) => {
    try {
      const accno = localStorage.getItem("accno");
      const amount = Number(data.amount);

      console.log("Account Number:", accno);
      console.log("Deposit Amount:", amount);

      if (!accno) {
        alert("Account number not found. Please login again.");
        nav("/login");
        return;
      }

      if (amount <= 0) {
        alert("Deposit amount must be greater than 0");
        return;
      }

      const response = await axios.get(
        `http://localhost:8080/bank/deposit/${accno}/${amount}`,
      );

      console.log("Deposit Response:", response.data);

      // Update account and balance immediately
      setAccount(response.data);
      setBalance(Number(response.data.balance) || 0);

      // Save updated account
      localStorage.setItem("account", JSON.stringify(response.data));

      localStorage.setItem("accno", response.data.accno);

      alert("Money deposited successfully!");

      nav("/customer-dashboard");
    } catch (error) {
      console.log("Deposit Error:", error);

      alert(
        error.response?.data?.message ||
          error.response?.data ||
          "Deposit failed",
      );
    }
  };

  if (!account) {
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
            className="dashboard-nav-item active"
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
            className="dashboard-nav-item"
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
            onClick={() => {
              localStorage.removeItem("account");
              localStorage.removeItem("accno");
              localStorage.removeItem("username");
              nav("/login");
            }}
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
            <p className="dashboard-welcome-small">Manage your money</p>

            <h1>Deposit Money 💰</h1>
          </div>

          <button className="profile-circle" onClick={() => nav("/profile")}>
            👤
          </button>
        </header>

        <div className="bank-form-layout">
          {/* DEPOSIT FORM */}
          <div className="bank-form-card">
            <div className="bank-form-icon">💰</div>

            <h2>Deposit Amount</h2>

            <p className="bank-form-description">
              Add money to your bank account securely.
            </p>

            <form onSubmit={handleSubmit(handleDeposit)}>
              {/* ACCOUNT NUMBER */}
              <div className="bank-input-group">
                <label>Account Number</label>

                <input type="text" value={account.accno || ""} readOnly />
              </div>

              {/* CURRENT BALANCE */}
              <div className="bank-input-group">
                <label>Current Balance</label>

                <input
                  type="text"
                  value={`₹ ${balance.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}`}
                  readOnly
                />
              </div>

              {/* DEPOSIT AMOUNT */}
              <div className="bank-input-group">
                <label>Amount to Deposit</label>

                <input
                  type="number"
                  placeholder="Enter amount"
                  {...register("amount", {
                    required: "Amount is required",
                    min: {
                      value: 1,
                      message: "Amount must be greater than 0",
                    },
                  })}
                />

                {errors.amount && (
                  <p className="error-message">{errors.amount.message}</p>
                )}
              </div>

              <button type="submit" className="bank-primary-btn">
                Deposit Money →
              </button>
            </form>
          </div>

          {/* INFORMATION CARD */}
          <div className="bank-info-card">
            <div className="info-card-icon">🔐</div>

            <h2>Secure Deposit</h2>

            <p>
              Your deposit is processed securely and your account balance is
              updated instantly.
            </p>

            <div className="info-stat">
              <span>Current Balance</span>

              <strong>
                ₹
                {balance.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>

            <div className="info-stat">
              <span>Account</span>

              <strong>{account.accountType || "SAVING"}</strong>
            </div>

            <div className="secure-note">🛡️ Your transaction is protected</div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepositPage;
