import { useContext, useState } from "react";
import { AuthContext } from "contexts/AuthContext";
import { login } from "api/admin";
import "./index.scss";

export const Login = () => {
  const { setToken } = useContext(AuthContext);
  const [userId, setUserId] = useState("");
  const handleLogin = async () => {
    try {
      const token = await login(userId);
      setToken(token);
    } catch (error) {
      console.error("Login failed: ", error);
    }
  };

  return (
    <div className="login-page">
      <img
        src="https://www.deptagency.com/wp-content/themes/dept/public/logo-light-new.svg"
        alt="DEPT®"
        title="DEPT®"
      />
      <p>Enter User ID to log in:</p>
      <input
        type="text"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User ID"
        className="login-input"
      />
      <button onClick={handleLogin} className="glow-on-hover">
        LOG IN
      </button>
    </div>
  );
};
