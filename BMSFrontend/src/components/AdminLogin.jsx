import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const onLogin = (data) => {
    // Default admin credentials
    if (data.username === "admin" && data.password === "admin@1234") {
      localStorage.setItem("admin", "true");
      nav("/admin-dashboard");
    } else {
      alert("Invalid admin username or password");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h2>Admin Login</h2>
          <p>Login to manage customer accounts</p>
        </div>

        <form onSubmit={handleSubmit(onLogin)}>
          {/* Username */}
          <div className="form-group">
            <label>Username</label>

            <input
              type="text"
              placeholder="Enter admin username"
              {...register("username", {
                required: "Username is required",
              })}
            />

            {errors.username && (
              <span className="error">{errors.username.message}</span>
            )}
          </div>

          {/* Password */}
          <div className="form-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter admin password"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <span className="error">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="bank-primary-btn">
            Admin Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
