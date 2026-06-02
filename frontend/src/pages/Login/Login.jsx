import {
  useState
} from "react";

import {
  useNavigate
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

  const [formData,
    setFormData] =
    useState({
      name:"",
      email:"",
      password:""
    });

  const handleChange =
    (e) => {

      setFormData({
        ...formData,
        [e.target.name]:
        e.target.value
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
          "Logged in Successfully"
        );

        navigate("/dashboard");

      } catch {

        toast.error(
          "Login Failed"
        );
      }
    };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >

      <h2>Login</h2>

      <input
        name="name"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button>
        Login
      </button>

    </form>
  );
}

export default Login;