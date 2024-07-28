import { useState } from 'react';
import style from './InputBox.module.css';
import axios from 'axios';

const MessageInput = ({ setMessageArray }) => {
  const [data, setData] = useState({
    message: '',
    date: '',
    time: '',
  });

  function send() {
    setMessageArray((prevArray) => [...prevArray, data]);
    axios
      .post('http://localhost:5000/api/chat/add', data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(`axios post error: ${error}`);
      });
  }

  function handleChange(event){
    const currentDateTime = new Date();
    setData({
      message: event.target.value,
      date: currentDateTime.toLocaleDateString(),
      time: currentDateTime.toLocaleTimeString(),
    });
  };

  return (
    <div className={style.mainDiv}>
      <h1 className={style.title}>Message</h1>
      <input onChange={handleChange} className={style.input} />
      <button onClick={send} className={style.button}>Send</button>
      <h1 className={style.title}>Room</h1>
      <input className={style.input} />
      <button className={style.button}>Join</button>
    </div>
  );
};

export default MessageInput;
