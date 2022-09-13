import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import "../cssComponents/Dashboard.css"
import paperName from '../questions/paperOf.json'

export default function Dashboard() {
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

  return (
    <>
    <div className="wrapper">
        <div className="text-center mt-4 name">
            {paperName.name}
        </div>
        {error && <Alert variant="danger">{error}</Alert>}
        <form className="p-3 mt-3" onSubmit={handleLogout}>
            <Link to="/question-page">
              <button className="btn mt-3 mb-3" style={{color: "white"}} type="button">
                Test Link
              </button>
            </Link>
            <div className="form-field flex align-items-center" id="password">
                <span className="fas fa-key"></span>
                <div style={{color: "black", fontSize:"1rem", marginLeft:"5px"}}> {currentUser.email}</div>
                <div style={{marginRight:"5px"}}>
                  <Link to='/update-profile'>
                    <button className="btn mt-3 mb-3" style={{color:"white", backgroundColor:"green"}} type="button">
                      update profile
                    </button>
                  </Link>
                </div>
            </div>
            <button className="btn mt-3" type="submit" >Log Out</button>
        </form>
      </div>
    </>
  )
}