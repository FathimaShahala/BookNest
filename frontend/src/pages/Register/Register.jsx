import {
  useState
} from "react";

import {
  useNavigate
} from "react-router-dom";

import {
  registerUser
} from "../../services/authService";

import {
  useAuth
} from "../../context/AuthContext";

import toast from "react-hot-toast";

import "./Register.css";

function Register() {

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
          await registerUser(
            formData
          );

        localStorage.setItem(
          "user",
          JSON.stringify(data)
        );

        setUser(data);

        toast.success(
          "Registered Successfully"
        );

        navigate("/dashboard");

      } catch {

        toast.error(
          "Registration Failed"
        );
      }
    };

  return (
    <form
      className="auth-form"
      onSubmit={handleSubmit}
    >

      <h2>Register</h2>

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
        Register
      </button>

    </form>
  );
}

export default Register;