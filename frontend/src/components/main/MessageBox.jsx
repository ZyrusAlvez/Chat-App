import style from "./MessageBox.module.css";
import { useContext } from "react";
import {UserContext} from "../../context/userContext"


const MessageBox = ({ dataArray }) => {
  const {username} = useContext(UserContext)

  return (
    <div className={style.mainDiv}>
      <ul>
        {dataArray.map((element, index) => (
          <li key={index} className={`${style.messageDiv} ${element.sender === username && style.sender}`}>{element.sender}: {element.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
