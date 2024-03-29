import React, { useState } from 'react'
import Signup from './Signup'
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './Login'
import PrivateRoute from './PrivateRoute'
import ForgotPassword from './ForgotPassword'
import UpdateProfile from './UpdateProfile'
import QuestionPage from './QuestionPage'
import EndPage from './EndPage'
import Info from './Info'


function App() {
  const [score, setScore] = useState(0)
  const [infoState, setinfoState] = useState({
    fullName: '',
    enrollment: '',
    semester: '',
  })

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh', overflowX: 'hidden',margin:"0",padding:"0",overflowX:"hidden" }}
    >
      <div
        className="w-100"
        style={{
          maxWidth: '400px',
          overflowX:"hidden"

          
        }}
      >
        <Router>
          <AuthProvider>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/info"
                element={
                  <PrivateRoute>
                    {' '}
                    <Info
                      infoState={infoState}
                      setinfoState={setinfoState}
                    />{' '}
                  </PrivateRoute>
                }
              />
              <Route
                path="/update-profile"
                element={
                  <PrivateRoute>
                    <UpdateProfile />
                  </PrivateRoute>
                }
              />
              <Route path="/signup" element={<Signup />} />
              <Route
                path="/question-page"
                element={
                  <PrivateRoute>
                    <QuestionPage
                      score={score}
                      setScore={setScore}
                      infoState={infoState}
                      setinfoState={setinfoState}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/end-page"
                element={
                  <PrivateRoute>
                    <EndPage
                      score={score}
                      setScore={setScore}
                      infoState={infoState}
                      setinfoState={setinfoState}
                    />
                  </PrivateRoute>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  )
}

export default App
