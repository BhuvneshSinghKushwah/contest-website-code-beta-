import React, {useState, useEffect} from 'react'
import { useLocation, useNavigate, Link} from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import QuestionPage from './QuestionPage'
import '../cssComponents/End.css'
import Questions from '../questions/questions.json'
import { db } from "../firebase"
import { collection ,doc, setDoc, Timestamp } from "firebase/firestore"


const EndPage = ({score, setScore, infoState }) => {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useNavigate()

  useEffect(() =>{
    const addData = async () =>{
      const docRef = doc(db, "studentScore", infoState.enrollment);

      const payLoad = {
          fullName: infoState.fullName,
          enrollment: infoState.enrollment,
          semester: infoState.semester,
          scored: score,
          email: currentUser.email,
          time: Timestamp.now()
        } 
    
      await setDoc(docRef, payLoad, {capital: true}, {merge: true});
    }
    
    addData();
    }, [])

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

  return (
    <div className="card">
      <div style={{borderRadius: '200px', height: '200px', width: '200px', backgroundColor: '#F8FAF5', margin: '0 auto' }}>
        <i className="checkmark">✓</i>
      </div>
        <h1> Well Done! </h1>
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