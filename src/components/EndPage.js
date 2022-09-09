import React, {useState} from 'react'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import QuestionPage from './QuestionPage'
import '../cssComponents/End.css'

const EndPage = () => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useNavigate()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }
const location = useLocation();
    return (
    <div className="card">
      <div style={{borderRadius: '200px', height: '200px', width: '200px', backgroundColor: '#F8FAF5', margin: '0 auto' }}>
        <i className="checkmark">✓</i>
      </div>
        <h1> Well Done! </h1>
        <p> You Scored : 20/30 </p>
        <div className="w-100 text-center mt-4">
          <button className='btn btn-danger' variant="link" onClick={handleLogout}>Log Out</button>
        </div>
    </div>
  )
}

export default EndPage