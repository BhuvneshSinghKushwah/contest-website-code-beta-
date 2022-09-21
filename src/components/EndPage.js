import React, {useState} from 'react'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import QuestionPage from './QuestionPage'
import '../cssComponents/End.css'
import Questions from '../questions/questions.json'

const EndPage = ( {score, setScore, infoState, setinfoState} ) => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      setScore(0);
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  console.log(score);
const location = useLocation();
    return (
    <div className="card">
      <div style={{borderRadius: '200px', height: '200px', width: '200px', backgroundColor: '#F8FAF5', margin: '0 auto' }}>
        <i className="checkmark">✓</i>
      </div>
        <h1> Well Done! </h1>
        <p> You Scored : {score}/{Questions.length} </p>
        <p> Name: {infoState.fullName}</p>
        <p> Enroll: {infoState.enrollment}</p>
        <p> Semester: {infoState.semester}</p>
        <div className="w-100 text-center mt-4">
          <button className='btn btn-danger' variant="link" onClick={handleLogout}>Log Out</button>
        </div>
    </div>
  )
}

export default EndPage