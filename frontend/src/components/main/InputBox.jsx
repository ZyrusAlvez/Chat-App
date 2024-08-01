import { useState, useEffect, useContext, useReducer } from 'react';
import style from './InputBox.module.css';
import axios from 'axios';
import { io } from "socket.io-client"
import { UserContext } from '../../context/userContext';


const MessageInput = ({ setDataArray }) => {
  const [data, setData] = useState({
    message: '',
    date: '',
    time: '',
    sender: ''
  });
  const [socketInstance, setSocketInstance] = useState(null);
  const {username} = useContext(UserContext)

  useEffect(() => {
    // initialize the socket (using state variable to be used in other function)
    const socket = io("http://localhost:5000")
    setSocketInstance(socket);
    return () => {
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (socketInstance) {
      socketInstance.on('receive-message', message => {
        setDataArray((prevArray) => [...prevArray, message]);
      });
    }
  }, [socketInstance])

  function send() {
    setDataArray((prevArray) => [...prevArray, data])
    axios
      .post('http://localhost:5000/api/chat/add', data)
      .then((response) => {
        console.log(response);
        // sends the message to the server
        if (socketInstance){
          socketInstance.emit('message', data, socketInstance.id)
        }
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
      sender: username
    });
    
  };

  return (
    <div className={style.mainDiv}>
      <h1 className={style.title}>Message</h1>
      <input onChange={handleChange} className={style.input} />
      <button onClick={send} className={style.button} disabled={!socketInstance}>Send</button>
      <h1 className={style.title}>Room</h1>
      <input className={style.input} />
      <button className={style.button}>Join</button>
    </div>
  );
};

export default MessageInput;