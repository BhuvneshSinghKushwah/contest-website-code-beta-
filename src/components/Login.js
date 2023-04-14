import React, { useRef, useState } from "react"
import "../cssComponents/Login.css";
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import { Alert } from 'react-bootstrap';
import image from '../componentsImg/LNCT_Bhopal_Logo.png';


export default function Login( ) {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history("/")
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="wrapper">
        <div className="logo">
            <img src={image} alt="" />
        </div>
        <div className="text-center mt-4 name">
            LNCT MCQ
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
            <div className="form-field d-flex align-items-center" id="email">
                <span className="far fa-user"></span>
                <input type="email" name="userName" id="userName" placeholder="Email" ref={emailRef} />
            </div>
            <div className="form-field d-flex align-items-center" id="password">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Password" ref={passwordRef} />
            </div>
            <button disabled={loading} className="btn mt-3" type="submit" >Login</button>
        </form>
        <div className="text-center fs-6">
            <Link to='/forgot-password'>Forget password?</Link> or <Link to='/signup'>Sign up</Link>
        </div>
      </div>
    </>
 )
}