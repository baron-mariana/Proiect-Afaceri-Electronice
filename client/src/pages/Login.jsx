import { useState } from "react";
import { loginUser } from "../routes/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await loginUser(email, password);

    if (response.success) {
      localStorage.setItem("token", response.data.token);
      window.location.href = "/";
    } else {
        toast.error('Invalid credentials');
    }
  };

  const handleRegister = async () => {
    navigate("/register");
  }

  return (
    <div className="formWrapper">
      <label htmlFor="email">Email</label>
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Your email.."
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className='loginButtonsWrapper'>
        <button type="submit" onClick={handleLogin}>
          Submit
        </button>
        <button onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Login;
