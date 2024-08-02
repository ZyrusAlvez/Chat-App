import style from "./MessageBox.module.css";
import useUserContext from "../../custom hook/useUserContext";


const MessageBox = ({ dataArray }) => {
  const {username} = useUserContext()

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
