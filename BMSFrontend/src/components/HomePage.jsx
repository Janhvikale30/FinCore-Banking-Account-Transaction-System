import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Homepage = () => {
  const navigate = useNavigate();

  const [users, setUsers] = useState(0);
  const [transactions, setTransactions] = useState(0);
  const [uptime, setUptime] = useState(0);

  // Animated statistics
  useEffect(() => {
    let userCount = 0;
    let transactionCount = 0;
    let uptimeCount = 0;

    const interval = setInterval(() => {
      if (userCount < 10000) {
        userCount += 250;
        setUsers(userCount);
      }

      if (transactionCount < 50000) {
        transactionCount += 1000;
        setTransactions(transactionCount);
      }

      if (uptimeCount < 99.9) {
        uptimeCount += 5;
        setUptime(Math.min(uptimeCount, 99.9));
      }

      if (
        userCount >= 10000 &&
        transactionCount >= 50000 &&
        uptimeCount >= 99.9
      ) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      icon: "💳",
      title: "Manage Account",
      description: "Create and manage your bank account easily from anywhere.",
    },
    {
      icon: "💰",
      title: "Deposit Money",
      description: "Deposit funds securely and keep your balance updated.",
    },
    {
      icon: "💸",
      title: "Withdraw Money",
      description: "Withdraw money quickly with secure banking operations.",
    },
    {
      icon: "📊",
      title: "Transaction History",
      description: "View and track all your banking transactions in one place.",
    },
    {
      icon: "🔐",
      title: "Secure Banking",
      description:
        "Your account information is protected with secure authentication.",
    },
    {
      icon: "⚡",
      title: "Fast Transfers",
      description: "Perform banking operations quickly and conveniently.",
    },
  ];

  return (
    <>
      <Navbar />

      <main>
        {/* HERO SECTION */}

        <section className="hero">
          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>

          <div className="hero-container">
            {/* LEFT SIDE */}

            <div className="hero-content">
              <div className="welcome-badge">
                ✨ Welcome to the future of banking
              </div>

              <h1>
                Banking Made
                <span> Simple & Secure.</span>
              </h1>

              <p>
                Manage your account, transfer money and track your transactions
                securely from anywhere, anytime.
              </p>

              <div className="hero-buttons">
                <button
                  className="primary-btn"
                  onClick={() => navigate("/login")}
                >
                  Login <span>→</span>
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => navigate("/register")}
                >
                  Open Account
                </button>
              </div>

              <div className="trust-text">
                🔒 Secure &nbsp; • &nbsp; ⚡ Fast &nbsp; • &nbsp; 🌐 Available
                24/7
              </div>
            </div>

            {/* RIGHT SIDE */}

            <div className="bank-card-container">
              <div className="bank-card">
                <div className="card-top">
                  <div>
                    <small>ONLINE BANK</small>

                    <h3>Premium Account</h3>
                  </div>

                  <span className="card-chip">◈</span>
                </div>

                <div className="card-number">
                  **** &nbsp; **** &nbsp; **** &nbsp; 2026
                </div>

                <div className="card-bottom">
                  <div>
                    <small>AVAILABLE BALANCE</small>

                    <strong>₹ 96,000</strong>
                  </div>

                  <div className="visa">VISA</div>
                </div>
              </div>

              {/* Floating payment */}

              <div className="floating-payment">
                <span>💰</span>

                <div>
                  <strong>Payment Received</strong>

                  <small>+ ₹12,500</small>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTICS */}

        <section className="statistics">
          <div className="stat-container">
            <div className="stat">
              <h2>{users.toLocaleString()}+</h2>

              <p>Happy Customers</p>
            </div>

            <div className="stat">
              <h2>{transactions.toLocaleString()}+</h2>

              <p>Transactions</p>
            </div>

            <div className="stat">
              <h2>{uptime.toFixed(1)}%</h2>

              <p>System Reliability</p>
            </div>

            <div className="stat">
              <h2>24/7</h2>

              <p>Banking Access</p>
            </div>
          </div>
        </section>

        {/* SERVICES */}

        <section className="services-section" id="services">
          <div className="section-heading">
            <span>WHAT WE OFFER</span>

            <h2>
              Everything You Need
              <strong> In One Place</strong>
            </h2>

            <p>
              Powerful banking services designed to make your financial life
              easier.
            </p>
          </div>

          <div className="services-grid">
            {services.map((service, index) => (
              <div className="service-card" key={index}>
                <div className="service-icon">{service.icon}</div>

                <h3>{service.title}</h3>

                <p>{service.description}</p>

                <button>Explore →</button>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}

        <section className="cta-section">
          <div>
            <span>READY TO GET STARTED?</span>

            <h2>Your smarter banking journey starts today.</h2>

            <p>
              Open your account and experience simple, secure and convenient
              digital banking.
            </p>

            <button onClick={() => navigate("/register")}>
              Open Your Account →
            </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default Homepage;
