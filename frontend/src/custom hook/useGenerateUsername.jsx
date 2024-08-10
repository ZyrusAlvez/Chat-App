import { useEffect } from 'react';
import axios from 'axios';
import useUserContext from './useUserContext.jsx';

const useGenerateUsername = () => {
  const { setUsername } = useUserContext();

  useEffect(() => {

      axios
        .post("http://localhost:5000/api/user/sign", { username: "Guest_", password: "pass_" })
        .then((response) => {
          const newUsername = response.data.username;
          localStorage.setItem('username', newUsername);
          setUsername(newUsername);
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

// might use cookie later on