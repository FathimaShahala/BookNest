import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  registerUser
} from "../../services/authService";

import toast from "react-hot-toast";

import "./Register.css";

function Register() {

  const navigate =
    useNavigate();

  const [
    formData,
    setFormData
  ] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
          e.target.value,
      });

    };

  const handleSubmit =
    async (e) => {

      e.preventDefault();

      try {

        await registerUser(
          formData
        );

        toast.success(
          "🎉 Registration successful! Please log in to continue.",
          {
            duration: 3000,
          }
        );

        navigate("/login");

      } catch (error) {

        const message =
          error.response?.data?.message;

        if (
          message ===
          "User already exists"
        ) {

          toast.error(
            "⚠️ An account with this email already exists."
          );

        } else {

          toast.error(
            message ||
            "❌ Registration failed. Please try again."
          );

        }

        console.log(error);

      }

    };

  return (
    <div className="register-page">

      <div className="register-card">

        <div className="register-header">

          <h1>
            📚 Join BookNest
          </h1>

          <p>
            Start your reading journey today
          </p>

        </div>

        <form
          className="register-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
          >
            Create Account
          </button>

        </form>

        <p className="login-link">

          Already have an account?

          <Link to="/login">
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;