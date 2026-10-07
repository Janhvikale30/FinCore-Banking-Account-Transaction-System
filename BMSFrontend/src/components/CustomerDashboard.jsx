import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CustomerDashboard = () => {
  const nav = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accno = localStorage.getItem("accno");

    if (!accno) {
      nav("/login");
      return;
    }

    const fetchAccount = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bank/account/${accno}`,
        );

        setCustomer(response.data);

        localStorage.setItem("account", JSON.stringify(response.data));
      } catch (error) {
        console.log(error);
        alert("Unable to load account information");
      } finally {
        setLoading(false);
      }
    };

    fetchAccount();
  }, [nav]);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("customerId");

    nav("/login");
  };

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="dashboard-loader"></div>
        <p>Loading your account...</p>
      </div>
    );
  }

  // =========================
  // DASHBOARD
  // =========================

  return (
    <div className="bank-page">
      {/* =====================================
          SIDEBAR
      ====================================== */}

      <aside className="dashboard-sidebar">
        {/* LOGO */}

        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">🏦</div>

          <span>OnlineBank</span>
        </div>

        {/* NAVIGATION */}

        <nav className="dashboard-nav">
          {/* Dashboard */}

          <button
            className="dashboard-nav-item active"
            onClick={() => nav("/customer-dashboard")}
          >
            <span className="nav-icon">🏠</span>

            <span>Dashboard</span>
          </button>

          {/* Deposit */}

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/deposit")}
          >
            <span className="nav-icon">💰</span>

            <span>Deposit Money</span>
          </button>

          {/* Withdraw */}

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/withdraw")}
          >
            <span className="nav-icon">💸</span>

            <span>Withdraw</span>
          </button>

          {/* Transactions */}

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/transactions")}
          >
            <span className="nav-icon">📋</span>

            <span>Transaction History</span>
          </button>

          {/* Profile */}

          <button
            className="dashboard-nav-item"
            onClick={() => nav("/profile")}
          >
            <span className="nav-icon">👤</span>

            <span>Profile</span>
          </button>
        </nav>

        {/* LOGOUT */}

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

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <main className="dashboard-main">
        {/* =================================
            TOP HEADER
        ================================== */}

        <header className="dashboard-topbar">
          <div>
            <p className="dashboard-welcome-small">Welcome back,</p>

            <h1>{customer?.username || "Customer"} 👋</h1>
          </div>

          {/* PROFILE BUTTON */}

          <button
            className="profile-circle"
            onClick={() => nav("/profile")}
            title="My Profile"
          >
            👤
          </button>
        </header>

        {/* =================================
            ACCOUNT SUMMARY CARD
        ================================== */}

        <div className="dashboard-account-card">
          <div className="balance-section">
            <p className="balance-label">Available Balance</p>

            <h2 className="dashboard-balance">
              ₹
              {Number(customer?.balance || 0).toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
            </h2>
          </div>

          {/* ACCOUNT NUMBER */}

          <div className="account-number-section">
            <span>Account Number</span>

            <strong>{customer?.accno || "N/A"}</strong>
          </div>
        </div>

        {/* =================================
            QUICK ACTIONS
        ================================== */}

        <section className="quick-actions-section">
          <div className="quick-actions-heading">
            <div>
              <h2>Quick Actions</h2>

              <p>Manage your bank account</p>
            </div>
          </div>

          <div className="quick-actions-grid">
            {/* ================= DEPOSIT ================= */}

            <button
              className="quick-action-card"
              onClick={() => nav("/deposit")}
            >
              <div className="quick-action-icon">💰</div>

              <div className="quick-action-content">
                <h3>Deposit Money</h3>

                <p>Add money to your account</p>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            {/* ================= WITHDRAW ================= */}

            <button
              className="quick-action-card"
              onClick={() => nav("/withdraw")}
            >
              <div className="quick-action-icon">💸</div>

              <div className="quick-action-content">
                <h3>Withdraw Money</h3>

                <p>Withdraw money from account</p>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            {/* ================= TRANSACTIONS ================= */}

            <button
              className="quick-action-card"
              onClick={() => nav("/transactions")}
            >
              <div className="quick-action-icon">📋</div>

              <div className="quick-action-content">
                <h3>Transactions</h3>

                <p>View transaction history</p>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>

            {/* ================= PROFILE ================= */}

            <button
              className="quick-action-card"
              onClick={() => nav("/profile")}
            >
              <div className="quick-action-icon">👤</div>

              <div className="quick-action-content">
                <h3>My Profile</h3>

                <p>View account information</p>
              </div>

              <span className="quick-action-arrow">→</span>
            </button>
          </div>
        </section>

        {/* =================================
            ACCOUNT INFORMATION
        ================================== */}

        <section className="dashboard-account-info">
          {/* HEADER */}

          <div className="account-info-header">
            <div>
              <h2>Account Information</h2>

              <p>Your account details</p>
            </div>

            <div className="account-info-icon">🏦</div>
          </div>

          {/* INFORMATION GRID */}

          <div className="account-info-grid">
            {/* ACCOUNT NUMBER */}

            <div className="account-info-item">
              <span>Account Number</span>

              <strong>{customer?.accno || "N/A"}</strong>
            </div>

            {/* ACCOUNT TYPE */}

            <div className="account-info-item">
              <span>Account Type</span>

              <strong>{customer?.accountType || "N/A"}</strong>
            </div>

            {/* USERNAME */}

            <div className="account-info-item">
              <span>Username</span>

              <strong>{customer?.username || "N/A"}</strong>
            </div>

            {/* CONTACT */}

            <div className="account-info-item">
              <span>Contact Number</span>

              <strong>{customer?.contact || "N/A"}</strong>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CustomerDashboard;
