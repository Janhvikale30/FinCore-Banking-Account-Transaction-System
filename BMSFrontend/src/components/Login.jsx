import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const nav = useNavigate();

  const onLogin = async (data) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/bank/login/${data.username}/${data.password}`,
      );

      const account = response.data;

      localStorage.setItem("account", JSON.stringify(account));

      localStorage.setItem("accno", account.accno);

      localStorage.setItem("username", account.username);

      nav("/customer-dashboard");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Invalid username or password");
    }
  };
  const fromValidations = {
    username: {
      required: { value: true, message: "Username is required" },
      minLength: {
        value: 3,
        message: "Username must be at least 3 characters",
      },
    },
    password: {
      required: { value: true, message: "Password is required" },
      pattern: {
        value:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message: "Enter valid password",
      },
    },
  };
  return (
    <>
      <div className="login-page">
        <div className="login-card">
          {/* Login Header */}
          <div className="login-header">
            <div className="login-icon">🏦</div>

            <h1>Welcome Back</h1>

            <p>Login to your Online Bank account</p>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleSubmit(onLogin)}>
            {/* Username */}
            <div className="form-group">
              <label htmlFor="username">Username</label>

              <input
                type="text"
                id="username"
                {...register("username", fromValidations.username)}
                placeholder="Enter your username"
              />
              {errors.username && (
                <p className="error-message">{errors.username.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="form-group">
              <label htmlFor="password">Password</label>

              <input
                type="password"
                id="password"
                {...register("password", fromValidations.password)}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="error-message">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="forgot-password">
              <button type="button">Forgot Password?</button>
            </div>

            {/* Login Button */}
            <button type="submit" className="login-submit-btn">
              Login
            </button>

            {/* Register */}
            <div className="register-text">
              <span>Don't have an account?</span>

              <button
                type="button"
                className="register-link"
                onClick={() => nav("/register")}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
