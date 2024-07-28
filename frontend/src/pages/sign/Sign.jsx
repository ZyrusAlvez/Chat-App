import React from 'react'
import { useNavigate } from 'react-router-dom'

const Sign = () => {
  const navigate = useNavigate()

  return (
    <button onClick={() => navigate("/")}>Click to go to main</button>
  )
}

export default Sign