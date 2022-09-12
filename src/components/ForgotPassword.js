import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import "../cssComponents/ForgotPage.css"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
     <div className="wrapper">
        <div className="text-center mt-4 name">
            RESET PASSWORD
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        {message && <Alert variant="success">{message}</Alert>}
        <form className="p-3 mt-3" onSubmit={handleSubmit}>
            <div className="form-field d-flex align-items-center" id="email">
                <span className="far fa-user"></span>
                <input type="email" name="userName" id="userName" placeholder="Email" ref={emailRef} required/>
            </div>
            <button disabled={loading} className="btn mt-3" type="submit" >Reset Password</button>
        </form>
        <div className="text-center fs-6 mt-3 ">
            <Link to='/login'>login</Link>
        </div>

        <div className="text-center fs-6 mt-3">
          Need and account?  <Link to='/signup'>Sign Up</Link>
        </div>
      </div>

      <div className="text-center fs-6 ">
            check your spam folder too!!
      </div>
    </>
  )
}