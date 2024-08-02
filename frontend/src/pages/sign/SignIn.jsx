import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function send() {
    axios
      .put("http://localhost:5000/api/user/log", { username, password })
      .then((response) => {
        console.log(response);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <input
        placeholder="username"
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        placeholder="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={send}>Sign In</button>
    </div>
  );
};

export default SignIn;
