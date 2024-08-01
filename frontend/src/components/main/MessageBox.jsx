import style from "./MessageBox.module.css";


const MessageBox = ({ dataArray }) => {
  console.log(dataArray)
  return (
    <div className={style.mainDiv}>
      <ul>
        {dataArray.map((element, index) => (
          <li key={index} className={style.messageDiv}>{element.sender}: {element.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default MessageBox;
