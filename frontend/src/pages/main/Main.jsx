import {useState, useEffect} from 'react'
import MessageBox from '../../components/main/MessageBox'
import InputBox from '../../components/main/InputBox'
import axios from "axios"


const Main = () => {

  const [dataArray, setDataArray] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/chat")
      .then((response) => {
        setDataArray(response.data)
      })
      .catch((error) => {
        console.log(`axios get error: ${error}`)
      })
  }, [])



  return (
    <div>
      <MessageBox dataArray={dataArray}/>
      <InputBox setDataArray={setDataArray}/>
    </div>
  )
}

export default Main