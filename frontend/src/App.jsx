import React, { useEffect } from 'react'
import Main from './pages/main/Main.jsx'
import Sign from './pages/sign/Sign.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "sign",
    element: <Sign />
  }
])

const App = () => {
  


  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App