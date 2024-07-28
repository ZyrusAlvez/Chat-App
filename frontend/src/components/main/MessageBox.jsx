import React from "react";
import style from "./MessageBox.module.css";

const MessageBox = ({ messages }) => {
  // messages is a array of string

  !messages ? messages = [] : null
  // if there's no msg

  return (
    <div className={style.mainDiv}>
      <ul>
        {messages.map((element, index) => (
          <li key={index} className={style.messageDiv}>{element.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
