import { useState } from "react";
import "./Login.css";

function LoginForm({ onLogin }) {
  const [username, setUsername] = useState("");
  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username);
  }

  return (
    <div className="login">
      <div className="login-detail">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-title">EchoSpot</div>
          <div className="login-input-container">
            <input
              className="login-input"
              value={username}
              onInput={(e) => setUsername(e.target.value)}
            />
            <button
              className="login-btn"
              type="button"
              onClick={() => onLogin(username)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
