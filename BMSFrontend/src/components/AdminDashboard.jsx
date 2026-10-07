import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const nav = useNavigate();

  const [accno, setAccno] = useState("");
  const [account, setAccount] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  // Check admin login
  React.useEffect(() => {
    const admin = localStorage.getItem("admin");

    if (admin !== "true") {
      nav("/admin-login");
    }
  }, [nav]);

  // Search customer
  const searchCustomer = async () => {
    if (!accno) {
      alert("Please enter account number");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.get(
        `http://localhost:8080/admin/search/${accno}`,
      );

      setAccount(response.data);
    } catch (error) {
      console.log(error);
      setAccount(null);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Customer account not found");
      }
    } finally {
      setLoading(false);
    }
  };

  // Update customer
  const updateCustomer = async () => {
    if (!account) {
      alert("Please search a customer first");
      return;
    }

    try {
      setUpdating(true);

      const updatedAccount = {
        name: account.name,
        dob: account.dob,
        age: Number(account.age),
        contact: Number(account.contact),
        gender: account.gender,
        accountType: account.accountType,
      };

      const response = await axios.put(
        `http://localhost:8080/admin/update/${account.accno}`,
        updatedAccount,
      );

      setAccount(response.data);

      alert("Customer details updated successfully!");
    } catch (error) {
      console.log(error);

      if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Unable to update customer details");
      }
    } finally {
      setUpdating(false);
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("admin");
    nav("/admin-login");
  };

  return (
    <div className="admin-dashboard-page">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          <h2>Bank Admin</h2>
        </div>

        <div className="sidebar-menu">
          <button
            className="sidebar-item active"
            onClick={() => window.scrollTo(0, 0)}
          >
            🏦 Dashboard
          </button>

          <button className="sidebar-item" onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="dashboard-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Manage customer account details</p>
          </div>
        </div>
        {/* Search Card */}
        ...
        {/* Search Card */}
        <div className="dashboard-card">
          <h2>Search Customer</h2>

          <div
            style={{
              display: "flex",
              gap: "12px",
              alignItems: "end",
              marginTop: "20px",
            }}
          >
            <div style={{ flex: 1 }}>
              <label>Account Number</label>

              <input
                type="number"
                placeholder="Enter account number"
                value={accno}
                onChange={(e) => setAccno(e.target.value)}
              />
            </div>

            <button
              className="bank-primary-btn"
              onClick={searchCustomer}
              disabled={loading}
              style={{
                width: "150px",
                marginTop: "0",
              }}
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
        {/* Customer Details */}
        {account && (
          <div className="dashboard-card">
            <div className="profile-page-header">
              <div className="profile-large-icon">👤</div>

              <div>
                <h2>Customer Details</h2>
                <p>Update customer information</p>
              </div>
            </div>

            <div className="profile-details-grid">
              {/* Account Number */}
              <div className="profile-detail">
                <label>Account Number</label>

                <input type="text" value={account.accno || ""} readOnly />
              </div>

              {/* Username */}
              <div className="profile-detail">
                <label>Username</label>

                <input type="text" value={account.username || ""} readOnly />
              </div>

              {/* Name */}
              <div className="profile-detail">
                <label>Name</label>

                <input
                  type="text"
                  value={account.name || ""}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      name: e.target.value,
                    })
                  }
                />
              </div>

              {/* DOB */}
              <div className="profile-detail">
                <label>Date of Birth</label>

                <input
                  type="date"
                  value={account.dob || ""}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      dob: e.target.value,
                    })
                  }
                />
              </div>

              {/* Age */}
              <div className="profile-detail">
                <label>Age</label>

                <input
                  type="number"
                  value={account.age || ""}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      age: e.target.value,
                    })
                  }
                />
              </div>

              {/* Contact */}
              <div className="profile-detail">
                <label>Contact</label>

                <input
                  type="number"
                  value={account.contact || ""}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      contact: e.target.value,
                    })
                  }
                />
              </div>

              {/* Gender */}
              <div className="profile-detail">
                <label>Gender</label>

                <select
                  value={account.gender || ""}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      gender: e.target.value,
                    })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Account Type */}
              <div className="profile-detail">
                <label>Account Type</label>

                <select
                  value={account.accountType || ""}
                  onChange={(e) =>
                    setAccount({
                      ...account,
                      accountType: e.target.value,
                    })
                  }
                >
                  <option value="">Select Account Type</option>
                  <option value="Savings">Savings</option>
                  <option value="Current">Current</option>
                </select>
              </div>

              {/* Balance */}
              <div className="profile-detail">
                <label>Balance</label>

                <input
                  type="text"
                  value={`₹ ${Number(account.balance || 0).toLocaleString(
                    "en-IN",
                    {
                      minimumFractionDigits: 2,
                    },
                  )}`}
                  readOnly
                />
              </div>
            </div>

            {/* Update Button */}
            <button
              className="bank-primary-btn"
              onClick={updateCustomer}
              disabled={updating}
              style={{ marginTop: "25px" }}
            >
              {updating ? "Updating..." : "Update Customer"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
