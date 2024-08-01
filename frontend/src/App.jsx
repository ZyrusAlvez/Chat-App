import React, { useContext, useEffect } from 'react';
import Main from './pages/main/Main.jsx';
import Sign from './pages/sign/Sign.jsx';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider, UserContext } from './context/userContext.jsx';
import axios from "axios";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/sign",
    element: <Sign />
  }
]);

const AppContent = () => {
  const { setUsername } = useContext(UserContext);

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/user/post", { username: "Guest_", password: "pass_" })
      .then((response) => {
        console.log(response);
        setUsername(response.data.username);
        console.log("dummy account created!");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUsername]);

  return <RouterProvider router={router} />;
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export default App;
