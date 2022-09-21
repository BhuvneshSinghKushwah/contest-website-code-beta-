import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../cssComponents/Info.css"

const InfoPage = ( {infoState, setinfoState } ) => {
  const emailRef = useRef()
  const history = useNavigate();
  const [loading, setLoading] = useState("false");

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setLoading(true)
      history.push("/question-page")
    } catch {
      console.log("error");
    }

    setLoading(false)
  }

  function handleChange(evt) {
    const value = evt.target.value;
    setinfoState({
      ...infoState,
      [evt.target.name]: value
    });
  }

  return (
    <>
     <div className="wrapper">
        <div className="text-center mt-4 name">
            LNCT MCQ
        </div>
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
            <div className="form-field d-flex align-items-center" id="fullName">
                <span className="far fa-user"></span>
                <input type="text" name="fullName"  placeholder="Enter your full name" deleteKeyCode={null} onChange={handleChange} label= "FullName" value={infoState.fullName} required/>
            </div>
            <div className="form-field d-flex align-items-center" id="enrollment">
                <span className="far fa-user"></span>
                <input type="text" name="semester"  placeholder="Enter your enrollment" deleteKeyCode={null} onChange={handleChange}  label = "Enrollment" value={infoState.enrollment} required/>
            </div>
            <div className="form-field d-flex align-items-center" id="semester">
                <span className="far fa-user"></span>
                <input type="text" name="semester"  placeholder="Enter your semester" deleteKeyCode={null} onChange={handleChange}  label = "Semester" value={infoState.semester} required/>
            </div>
           <button disabled={loading} className="btn mt-3" type="submit">
                Start Test
           </button>
        </form>
      </div>
    </>
  )
}

export default InfoPage