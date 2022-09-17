import { useState, useEffect } from 'react'
import reactLogo from '../../assets/react.svg'

import './styles.css'
import { Card } from '../../components/Card'

export function Home() {
  const [count, setCount] = useState(0)
  const [studentName, setStudentName] = useState('Digite o Nome')
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name: '', avatar: ''})

  function AddStudent() {
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    }
    // this is called Spread syntax (...), despejar oque já existia na variável
    setStudents(prevState => [...prevState, newStudent])
  }

  useEffect(() => {
    fetch('https://api.github.com/users/Gotera')
    .then (response => response.json())
    .then (data => {
      setUser ({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  },[students, setStudentName])

  return (
    <div className="container">
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Profile Picture'/>
        </div>

      </header>

      <h2>Adicionando: {studentName}</h2>

      <input 
        type="text"
        placeholder = "Lista de Presença"
        onChange={e => setStudentName(e.target.value)}>
      </input>

      <button type="button" onClick={AddStudent}>
        Adicionar
      </button>

      { students.map(student => <Card key={student.time} name={student.name} time={student.time} />) }

    </div>
  )
}

