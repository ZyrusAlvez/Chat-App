import {useState } from 'react'
import  useUserContext  from '../../custom hook/useUserContext'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"

const LogIn = () => {
  const navigate = useNavigate()
  const [username, setUsernameInput] = useState("")
  const [password, setPassword] = useState("")
  const { setUsername } = useUserContext();

  function send(){
    axios
    .post("http://localhost:5000/api/user/log", {username, password})
    .then((response) => {
      console.log(response)
      setUsername(username)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <input placeholder="username" onChange={(event) => setUsernameInput(event.target.value)}/>
      <input placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
      <button onClick={send}>Log In</button>
      <h6>Don't Have an account yet? <Link to="/sign">Click me</Link></h6>
    </div>
  )
}

export default LogIn