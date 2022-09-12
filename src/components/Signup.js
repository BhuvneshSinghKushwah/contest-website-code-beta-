import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../cssComponents/Signup.css"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="wrapper">
        <div className="text-center mt-4 name">
            SIGN UP
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
            <div className="form-field d-flex align-items-center" id="email">
                <span className="far fa-user"></span>
                <input type="email" name="userName" id="userName" placeholder="Enter Email" ref={emailRef} required/>
            </div>
            <div className="form-field d-flex align-items-center" id="password">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Enter Password" ref={passwordRef} required/>
            </div>
            <div className="form-field d-flex align-items-center" id="password">
                <span className="fas fa-key"></span>
                <input type="password" name="password" id="pwd" placeholder="Confirm Password" ref={passwordConfirmRef} required/>
            </div>
            <button disabled={loading} className="btn mt-3" type="submit" >Sign Up</button>
        </form>
        <div className="text-center fs-6">
            Already have an account? <Link to='/login'>Login</Link>
        </div>
      </div>
    </>
  )
}

