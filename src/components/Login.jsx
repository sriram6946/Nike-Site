import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = () => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = () => {
  const users = JSON.parse(localStorage.getItem("users"));

  if (!users || users.length === 0) {
    alert("No accounts found. Please register.");
    return;
  }

  const matchedUser = users.find(
    (user) =>
      user.email === email && user.password === password
  );

  if (matchedUser) {
    alert(`Welcome ${matchedUser.name}`);
    navigate("/");
  } else {
    alert("Invalid email or password");
  }
};


  return (
    <div className="login-page">
      <div className="login-card">
        <h3>Log in to your account</h3>
        <p className="login-subtext">
          Get personalised picks & faster checkout
        </p>

        <div className="credentials">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => SetEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => SetPassword(e.target.value)}
            required
          />
          <button onClick={handleLogin}>Sign In</button>
        </div>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/Register">
            <span>Register now</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
