import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const nav = useNavigate();

  const [account, setAccount] = useState(null);

  useEffect(() => {
    const accno = localStorage.getItem("accno");

    console.log("Profile Account Number:", accno);

    if (!accno) {
      alert("Account number not found. Please login again.");
      nav("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/bank/account/${accno}`,
        );

        console.log("Profile Response:", response.data);

        setAccount(response.data);

        localStorage.setItem("account", JSON.stringify(response.data));
      } catch (error) {
        console.log("Profile Error:", error);

        if (error.response) {
          alert(
            error.response.data?.message ||
              error.response.data ||
              "Unable to fetch profile",
          );
        } else {
          alert("Unable to connect to Spring Boot server.");
        }
      }
    };

    fetchProfile();
  }, [nav]);

  const handleLogout = () => {
    localStorage.removeItem("account");
    localStorage.removeItem("accno");
    localStorage.removeItem("username");

    nav("/login");
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
            className="dashboard-nav-item"
            onClick={() => nav("/transactions")}
          >
            <span className="nav-icon">📋</span>
            <span>Transaction History</span>
          </button>

          <button
            className="dashboard-nav-item active"
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
            <p className="dashboard-welcome-small">Manage your account</p>

            <h1>My Profile 👤</h1>
          </div>

          <button className="profile-circle" onClick={() => nav("/profile")}>
            👤
          </button>
        </header>

        {/* PROFILE CARD */}

        <div className="profile-page-card">
          <div className="profile-page-header">
            <div className="profile-large-icon">👤</div>

            <div>
              <h2>{account.name}</h2>

              <p>@{account.username}</p>
            </div>
          </div>

          <div className="profile-details-grid">
            <div className="profile-detail">
              <span>Account Number</span>

              <strong>{account.accno}</strong>
            </div>

            <div className="profile-detail">
              <span>Full Name</span>

              <strong>{account.name}</strong>
            </div>

            <div className="profile-detail">
              <span>Date of Birth</span>

              <strong>{account.dob}</strong>
            </div>

            <div className="profile-detail">
              <span>Contact</span>

              <strong>{account.contact}</strong>
            </div>

            <div className="profile-detail">
              <span>Age</span>

              <strong>{account.age}</strong>
            </div>

            <div className="profile-detail">
              <span>Gender</span>

              <strong>{account.gender}</strong>
            </div>

            <div className="profile-detail">
              <span>Account Type</span>

              <strong>{account.accountType}</strong>
            </div>

            <div className="profile-detail">
              <span>Username</span>

              <strong>{account.username}</strong>
            </div>

            <div className="profile-detail balance-detail">
              <span>Current Balance</span>

              <strong>
                ₹
                {Number(account.balance).toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                })}
              </strong>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Profile;
