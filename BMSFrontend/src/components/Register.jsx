import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nav = useNavigate();

  const formValidations = {
    accno: {
      required: {
        value: true,
        message: "Account number is required",
      },
      pattern: {
        value: /^[0-9]{10,16}$/,
        message: "Enter a valid account number",
      },
    },

    name: {
      required: {
        value: true,
        message: "Full name is required",
      },
      minLength: {
        value: 3,
        message: "Name must be at least 3 characters",
      },
      pattern: {
        value: /^[A-Za-z ]+$/,
        message: "Name should contain only letters",
      },
    },

    dob: {
      required: {
        value: true,
        message: "Date of birth is required",
      },
    },

    contact: {
      required: {
        value: true,
        message: "Contact number is required",
      },
      pattern: {
        value: /^[6-9][0-9]{9}$/,
        message: "Enter a valid 10 digit mobile number",
      },
    },

    age: {
      required: {
        value: true,
        message: "Age is required",
      },
      min: {
        value: 18,
        message: "Age must be at least 18",
      },
    },

    gender: {
      required: {
        value: true,
        message: "Please select gender",
      },
    },

    accountType: {
      required: {
        value: true,
        message: "Please select account type",
      },
    },

    balance: {
      required: {
        value: true,
        message: "Initial balance is required",
      },
      min: {
        value: 0,
        message: "Balance cannot be negative",
      },
    },

    username: {
      required: {
        value: true,
        message: "Username is required",
      },
      minLength: {
        value: 4,
        message: "Username must be at least 4 characters",
      },
    },

    password: {
      required: {
        value: true,
        message: "Password is required",
      },
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters",
      },
    },
  };

  const onRegister = async (data) => {
    try {
      const accountData = {
        accno: Number(data.accno),
        name: data.name,
        dob: data.dob,
        contact: Number(data.contact),
        age: Number(data.age),
        gender: data.gender,
        accountType: data.accountType,
        balance: Number(data.balance),
        username: data.username,
        password: data.password,
      };

      const response = await axios.post(
        "http://localhost:8080/bank/create",
        accountData,
      );

      console.log(response.data);

      alert("Account created successfully!");
      nav("/login");
    } catch (error) {
      console.log(error);
      alert("Unable to create account");
    }
  };

  return (
    <div className="register-page">
      <div className="register-card">
        {/* Header */}

        <div className="register-header">
          <div className="register-icon">🏦</div>

          <h1>Create New Account</h1>

          <p>Open your Online Bank account</p>
        </div>

        {/* Registration Form */}

        <form className="register-form" onSubmit={handleSubmit(onRegister)}>
          {/* Account Number */}

          <div className="register-form-group">
            <label htmlFor="accno">Account Number</label>

            <input
              type="text"
              id="accno"
              placeholder="Enter account number"
              {...register("accno", formValidations.accno)}
            />

            {errors.accno && (
              <p className="error-message">{errors.accno.message}</p>
            )}
          </div>

          {/* Full Name */}

          <div className="register-form-group">
            <label htmlFor="name">Full Name</label>

            <input
              type="text"
              id="name"
              placeholder="Enter full name"
              {...register("name", formValidations.name)}
            />

            {errors.name && (
              <p className="error-message">{errors.name.message}</p>
            )}
          </div>

          {/* Date of Birth + Contact */}

          <div className="register-row">
            <div className="register-form-group">
              <label htmlFor="dob">Date of Birth</label>

              <input
                type="date"
                id="dob"
                {...register("dob", formValidations.dob)}
              />

              {errors.dob && (
                <p className="error-message">{errors.dob.message}</p>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="contact">Contact Number</label>

              <input
                type="tel"
                id="contact"
                placeholder="Enter contact number"
                {...register("contact", formValidations.contact)}
              />

              {errors.contact && (
                <p className="error-message">{errors.contact.message}</p>
              )}
            </div>
          </div>

          {/* Age + Gender */}

          <div className="register-row">
            <div className="register-form-group">
              <label htmlFor="age">Age</label>

              <input
                type="number"
                id="age"
                placeholder="Enter age"
                {...register("age", formValidations.age)}
              />

              {errors.age && (
                <p className="error-message">{errors.age.message}</p>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="gender">Gender</label>

              <select
                id="gender"
                {...register("gender", formValidations.gender)}
              >
                <option value="">Select Gender</option>

                <option value="Male">Male</option>

                <option value="Female">Female</option>

                <option value="Other">Other</option>
              </select>

              {errors.gender && (
                <p className="error-message">{errors.gender.message}</p>
              )}
            </div>
          </div>

          {/* Account Type + Balance */}

          <div className="register-row">
            <div className="register-form-group">
              <label htmlFor="accountType">Account Type</label>

              <select
                id="accountType"
                {...register("accountType", formValidations.accountType)}
              >
                <option value="">Select Account Type</option>

                <option value="SAVING">SAVING</option>

                <option value="CURRENT">CURRENT</option>
              </select>

              {errors.accountType && (
                <p className="error-message">{errors.accountType.message}</p>
              )}
            </div>

            <div className="register-form-group">
              <label htmlFor="balance">Initial Balance (₹)</label>

              <input
                type="number"
                id="balance"
                placeholder="Enter initial balance"
                {...register("balance", formValidations.balance)}
              />

              {errors.balance && (
                <p className="error-message">{errors.balance.message}</p>
              )}
            </div>
          </div>

          {/* Username */}

          <div className="register-form-group">
            <label htmlFor="username">Username</label>

            <input
              type="text"
              id="username"
              placeholder="Create username"
              {...register("username", formValidations.username)}
            />

            {errors.username && (
              <p className="error-message">{errors.username.message}</p>
            )}
          </div>

          {/* Password */}

          <div className="register-form-group">
            <label htmlFor="password">Password</label>

            <input
              type="password"
              id="password"
              placeholder="Create password"
              {...register("password", formValidations.password)}
            />

            {errors.password && (
              <p className="error-message">{errors.password.message}</p>
            )}
          </div>

          {/* Create Account */}

          <button type="submit" className="create-account-btn">
            Create Account
          </button>

          {/* Login */}

          <div className="already-account">
            <span>Already have an account?</span>

            <button
              type="button"
              className="login-link"
              onClick={() => nav("/login")}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
