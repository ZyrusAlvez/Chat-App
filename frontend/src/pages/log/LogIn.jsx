import {useState} from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"

const LogIn = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")


  function send(){
    axios
    .post("http://localhost:5000/api/user/log", {username, password})
    .then((response) => {
      console.log(response)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  return (
    <div>
      <input placeholder="username" onChange={(event) => setUsername(event.target.value)}/>
      <input placeholder="password" onChange={(event) => setPassword(event.target.value)}/>
      <button onClick={send}>Log In</button>
      <h6>Don't Have an account yet? <Link to="/sign">Click me</Link></h6>
    </div>
  )
}

export default LogIn