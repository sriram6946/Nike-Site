import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, SetName] = useState("");
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();

const handleRegister = (e) => {
  e.preventDefault();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const carts = JSON.parse(localStorage.getItem("carts")) || [];

  const emailNormalized = email.trim().toLowerCase();

  const userExists = users.some(u => u.email === emailNormalized);
  if (userExists) {
    alert("User already exists. Please login.");
    return;
  }

  const newUser = {
    id: crypto.randomUUID(), 
    name,
    email: emailNormalized,
    password
  };

  users.push(newUser);

  carts.push({
    userId: newUser.id,
    items: []
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("carts", JSON.stringify(carts));

  alert("Account created successfully!");
  navigate("/login");
};




  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleRegister}>
        <h2>Create Account</h2>

        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => SetName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Enter a password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
          required
        />

        <button className="primary-btn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
