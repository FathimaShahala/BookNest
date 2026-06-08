import {
  useState
} from "react";

import {
  useNavigate,
  Link
} from "react-router-dom";

import {
  loginUser
} from "../../services/authService";

import {
  useAuth
} from "../../context/AuthContext";

import toast from "react-hot-toast";

import "./Login.css";

function Login() {

  const navigate =
    useNavigate();

  const { setUser } =
    useAuth();

  const [
    formData,
    setFormData
  ] = useState({
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

        const data =
          await loginUser(
            formData
          );

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        setUser(data);

        toast.success(
          "Welcome Back!"
        );

        navigate(
          "/dashboard"
        );

      } catch (error) {

        toast.error(
          "Invalid Email or Password"
        );
      }
    };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-header">

          <h1>
            📚 BookNest
          </h1>

          <p>
            Welcome back to your
            reading journey
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={
            handleSubmit
          }
        >

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={
              formData.email
            }
            onChange={
              handleChange
            }
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={
              formData.password
            }
            onChange={
              handleChange
            }
            required
          />

          <button
            type="submit"
          >
            Login
          </button>

        </form>

        <p className="register-link">

          Don't have an account?

          <Link
            to="/register"
          >
            Register
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;