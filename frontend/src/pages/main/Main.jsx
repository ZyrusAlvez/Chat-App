import {useState, useEffect} from 'react'
import MessageBox from '../../components/main/MessageBox'
import InputBox from '../../components/main/InputBox'
import axios from "axios"


const Main = () => {

  const [messageArray, setMessageArray] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chat")
      .then((response) => {
        setMessageArray(response.data)
      })
      .catch((error) => {
        console.log(`axios get error: ${error}`)
      })
  }, [])



  return (
    <div>
      <MessageBox messages={messageArray}/>
      <InputBox setMessageArray={setMessageArray}/>
    </div>
  )
}

export default Main