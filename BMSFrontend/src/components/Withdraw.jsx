import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Withdraw = () => {
  const nav = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(0);

  // Fetch account details
  useEffect(() => {
    const accno = localStorage.getItem("accno");

    console.log("Withdraw Account Number:", accno);

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

        console.log("Account Response:", response.data);

        setAccount(response.data);

        setBalance(Number(response.data.balance) || 0);

        // Update localStorage with latest account
        localStorage.setItem("account", JSON.stringify(response.data));
      } catch (error) {
        console.log("Account Fetch Error:", error);

        if (error.response) {
          alert(
            error.response.data?.message ||
              error.response.data ||
              "Account not found",
          );
        } else {
          alert("Unable to connect to Spring Boot server.");
        }

        nav("/login");
      }
    };

    fetchAccount();
  }, [nav]);

  // Withdraw money
  const handleWithdraw = async (data) => {
    try {
      const accno = localStorage.getItem("accno");

      console.log("Withdraw Account Number:", accno);

      if (!accno) {
        alert("Account number not found. Please login again.");

        nav("/login");

        return;
      }

      const amount = Number(data.amount);

      console.log("Withdraw Amount:", amount);

      if (amount <= 0) {
        alert("Withdraw amount must be greater than 0");

        return;
      }

      // Optional frontend balance check
      if (amount > balance) {
        alert("Insufficient balance");

        return;
      }

      // Call Spring Boot backend
      const response = await axios.get(
        `http://localhost:8080/bank/withdraw/${accno}/${amount}`,
      );

      console.log("Withdraw Response:", response.data);

      // Update account
      setAccount(response.data);

      setBalance(Number(response.data.balance) || 0);

      // Save latest account
      localStorage.setItem("account", JSON.stringify(response.data));

      localStorage.setItem("accno", response.data.accno);

      alert("Amount withdrawn successfully!");

      nav("/customer-dashboard");
    } catch (error) {
      console.log("Withdraw Error:", error);

      if (error.response) {
        console.log("Backend Error:", error.response.data);

        alert(
          error.response.data?.message ||
            error.response.data ||
            "Withdrawal failed",
        );
      } else {
        alert("Unable to connect to Spring Boot server.");
      }
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("accno");
    localStorage.removeItem("username");

    nav("/login");
  };

  // Loading
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
            className="dashboard-nav-item"
            onClick={() => nav("/deposit")}
          >
            <span className="nav-icon">💰</span>

            <span>Deposit Money</span>
          </button>

          <button
            className="dashboard-nav-item active"
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
            <p className="dashboard-welcome-small">Manage your money</p>

            <h1>Withdraw Money 💸</h1>
          </div>

          <button className="profile-circle" onClick={() => nav("/profile")}>
            👤
          </button>
        </header>

        <div className="bank-form-layout">
          {/* WITHDRAW FORM */}

          <div className="bank-form-card">
            <div className="bank-form-icon">💸</div>

            <h2>Withdraw Amount</h2>

            <p className="bank-form-description">
              Withdraw money from your bank account securely.
            </p>

            <form onSubmit={handleSubmit(handleWithdraw)}>
              {/* ACCOUNT NUMBER */}

              <div className="bank-input-group">
                <label>Account Number</label>

                <input type="text" value={account.accno || ""} readOnly />
              </div>

              {/* BALANCE */}

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

              {/* AMOUNT */}

              <div className="bank-input-group">
                <label>Amount to Withdraw</label>

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
                Withdraw Money →
              </button>
            </form>
          </div>

          {/* INFORMATION CARD */}

          <div className="bank-info-card">
            <div className="info-card-icon">🔐</div>

            <h2>Secure Withdrawal</h2>

            <p>
              Your withdrawal is processed securely and your account balance is
              updated instantly.
            </p>

            <div className="info-stat">
              <span>Available Balance</span>

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

export default Withdraw;
