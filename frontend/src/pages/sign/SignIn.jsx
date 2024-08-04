import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserContext from "../../custom hook/useUserContext"
import axios from "axios";

const SignIn = () => {
  const navigate = useNavigate();
  const {setUsername} = useUserContext()
  const [signUsername, setSignUsername] = useState("");
  const [signPassword, setSignPassword] = useState("");

  function send() {
    axios
      .post("http://localhost:5000/api/user/sign", {username: signUsername, password: signPassword})
      .then((response) => {
        console.log(response);
        navigate("/")
        setUsername(signUsername)
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div>
      <input
        placeholder="username"
        onChange={(event) => setSignUsername(event.target.value)}
      />
      <input
        placeholder="password"
        onChange={(event) => setSignPassword(event.target.value)}
      />
      <button onClick={send}>Sign In</button>
    </div>
  );
};

export default SignIn;
