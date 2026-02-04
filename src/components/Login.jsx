import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const LoginPage = ({ setUser }) => {
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");

  const navigate = useNavigate();
 const handleLogin = (e) => {
  e.preventDefault();

  const user = {
    name: email.split("@")[0],
    email,
  };


  
 localStorage.setItem("currentUser", JSON.stringify(user));
setUser(user);          
navigate("/");

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
