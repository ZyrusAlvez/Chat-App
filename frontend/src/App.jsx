import React from 'react';
import Main from './pages/main/Main.jsx';
import SignIn from './pages/sign/SignIn.jsx';
import LogIn from "./pages/log/LogIn.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { UserProvider } from './context/userContext.jsx';
import useGenerateUsername from './custom hook/useGenerateUsername.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />
  },
  {
    path: "/sign",
    element: <SignIn />
  },
  {
    path: "/log",
    element: <LogIn />
  }
]);

const App = () => {
  useGenerateUsername();

  return <RouterProvider router={router} />;
};

const RootApp = () => (
  <UserProvider>
    <App />
  </UserProvider>
);

export default RootApp;
