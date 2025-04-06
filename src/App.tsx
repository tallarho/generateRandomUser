import { useEffect, useState } from 'react'
import './App.css'
import loader from './loader.gif'
import axios from 'axios'

const App:React.FC = () => {
  
  const [user, setUser] = useState<{first: string, last: string} | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [img, setImg] = useState<string>('')

  const fetchUser = () => {
    setLoading(true)
    axios.get('https://randomuser.me/api').then(response =>{
      const name = response.data.results[0].name
      setImg(response.data.results[0].picture.large)
      setUser({first: name.first, last: name.last})
      setLoading(false)
     })
  }
    useEffect(()=>{
      fetchUser()
    },[])


  return (  
        <div>
          <div className="wrapper">
            {loading && <div className="loader"><img src={loader} draggable="false" /></div>}
            {user && (
              <div className="wr-person">
                <h1>ГЕНЕРАЦИЯ ПОЛЬЗОВАТЕЛЯ</h1> 
                <p>Имя: {user.first}</p>
                <p>Фамилия: {user.last}</p>
                <img src={img} />
              </div>
            )}
            
            <button onClick={fetchUser}>Сгенирировать</button>
        </div>
    </div>
  )
}
export default App
