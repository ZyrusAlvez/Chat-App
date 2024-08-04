import { useEffect } from 'react';
import axios from 'axios';
import useUserContext from './useUserContext.jsx';

const useGenerateUsername = () => {
  const { setUsername } = useUserContext();

  useEffect(() => {
    axios
      .post("http://localhost:5000/api/user/post", { username: "Guest_", password: "pass_" })
      .then((response) => {
        setUsername(response.data.username);
        console.log("dummy account created!");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUsername]);
};

export default useGenerateUsername;
// using the browser's local storage to generate username only once
// this will also help the user to stay logged in even after closing the website