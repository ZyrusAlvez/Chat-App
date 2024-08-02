import { UserContext } from "../context/userContext";
import { useContext } from "react";

// easier way to use the context
export default function useUserContext(){
  return useContext(UserContext) // just destructure the username and setUsername
}