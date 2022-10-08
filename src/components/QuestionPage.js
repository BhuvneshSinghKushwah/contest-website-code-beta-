<<<<<<< HEAD
<<<<<<< HEAD
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Questions from "../questions/questions.json";
import PaperName from "../questions/paperOf.json";


export default function QuestionPage( {score, setScore, infoState, setinfoState} ) {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();
  const [userResponses, setUserResponses] = useState([]);
  const dataOps = ['A', 'B', 'C', 'D']

  window.addEventListener('popstate', function(event){
    handleLogout();
  });

  const keyArr = ['A', 'C', 'A', 'D', 'C', 'A', 'A', 'B', 'D', 'D', 'D', 'C', 'C', 'D', 'A', 'B', 'A', 'C', 'A', 'A', 'A', 'A', 'A', 'D', 'A', 'B', 'D', 'A', 'D', 'B', 'A', 'D', 'C', 'B', 'C', 'A', 'A', 'A', 'C', 'D'];
  const handleEndPage = async () => {
    history("/end-page", );
  }


  const initializeResponses = useCallback(() => {
    const responses = []
    for(let i = 0; i < Questions.length; i++) {
      responses.push(Array(4).fill(""))
=======
import React, { useState, useEffect, useCallback } from 'react'
=======
import React, { useState, useEffect, useCallback, useRef } from 'react'
>>>>>>> b25c276 (session ending timer added)
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import Questions from '../questions/questions.json'
import PaperName from '../questions/paperOf.json'
import '../cssComponents/index.css';
export default function QuestionPage({
  score,
  setScore,
  infoState,
  setinfoState,
}) {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useNavigate()
  const [userResponses, setUserResponses] = useState([])
  const dataOps = ['A', 'B', 'C', 'D']
  const timer = useRef(null);

  window.addEventListener('popstate', function (event) {
    handleLogout()
  })

  const keyArr = [
    'A',
    'C',
    'A',
    'D',
    'C',
    'A',
    'A',
    'B',
    'D',
    'D',
    'D',
    'C',
    'C',
    'D',
    'A',
    'B',
    'A',
    'C',
    'A',
    'A',
    'A',
    'A',
    'A',
    'D',
    'A',
    'B',
    'D',
    'A',
    'D',
    'B',
    'A',
    'D',
    'C',
    'B',
    'C',
    'A',
    'A',
    'A',
    'C',
    'D',
  ]
  const handleEndPage = async () => {
    if(timer.current)
    {
      clearTimeout(timer.current);
    }
    history('/end-page')
  }

  const initializeResponses = useCallback(() => {
    const responses = []
    for (let i = 0; i < Questions.length; i++) {
      responses.push(Array(4).fill(''))
>>>>>>> f2cf08d (UI made Better)
    }
    setUserResponses([...responses])
  }, [])

<<<<<<< HEAD

  useEffect(() => {
    initializeResponses()
  }, [initializeResponses]);


  /**
   * 
   * @param {number} quesNumber 
   * @param {number} optionNumber 
   * @param {string} selection 
   */
  const handleSelectOption = (quesNumber, optionNumber, selection) => {
    let responses = [...userResponses]
    responses[quesNumber] = Array(4).fill("")
    responses[quesNumber][optionNumber] = selection
    setUserResponses(responses)
  };


  const ScoreOfUser = () => {

    for(let i = 0; i < Questions.length; i++)
    {

       for(let j = 0; j < 4; j++ )
       {
        if(!!userResponses[i][j] && userResponses[i][j].length !== 0)
        {
          if(keyArr[i] === userResponses[i][j])
          {
            setScore(prevScore => prevScore+1);
=======
  useEffect(() => {
    timer.current = setTimeout(handleEndPage, 3600*1000);
  })

  useEffect(() => {
    initializeResponses()
  }, [initializeResponses])

  /**
   *
   * @param {number} quesNumber
   * @param {number} optionNumber
   * @param {string} selection
   */
  const handleSelectOption = (quesNumber, optionNumber, selection) => {
    let responses = [...userResponses]
    responses[quesNumber] = Array(4).fill('')
    responses[quesNumber][optionNumber] = selection
    setUserResponses(responses)
  }

  const ScoreOfUser = () => {
    for (let i = 0; i < Questions.length; i++) {
      for (let j = 0; j < 4; j++) {
        if (!!userResponses[i][j] && userResponses[i][j].length !== 0) {
          if (keyArr[i] === userResponses[i][j]) {
            setScore((prevScore) => prevScore + 1)
>>>>>>> f2cf08d (UI made Better)
          }
        }
      }
    }
<<<<<<< HEAD
    handleEndPage();
  };

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
=======
    handleEndPage()
  }

  async function handleLogout() {
    setError('')

    try {
      await logout()
      history.push('/login')
    } catch {
      setError('Failed to log out')
>>>>>>> f2cf08d (UI made Better)
    }
  }

  return (
    <>
<<<<<<< HEAD
      <div>
        <nav
          className="container-fluid fixed-top border shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "#EEF2F0" }}
          variant="light"
        >
          <div className="container-fluid d-flex" variant="light">
=======
      <div className="chbg">
        <nav
          className="container-fluid fixed-top border shadow-lg p-3 mb-5  rounded"
          style={{
            backgroundImage: 'linear-gradient(to right, #8360c3, #2ebf91)',
            width: '100vw',
            height: '100px',
          }}
        >
          <div
            className="container-fluid d-flex"
            variant="light"
            style={{
              color: 'white',
              width: '100%',
            }}
          >
>>>>>>> f2cf08d (UI made Better)
            <div className="container-fluid justify-content-center text-center mt-3 mb-2 ">
              <div style={{ fontSize: 40 }}> {PaperName.name} </div>
            </div>
            <div
              className="container-fluid d-flex text-center mt-2 mb-2"
              style={{ width: 140 }}
            >
              <Button
                variant="light"
                type="button"
                style={{
<<<<<<< HEAD
                  fontSize: 15,
                  color: "white",
                  background: "#008000"
                }}
                className="mt-2 mx-2"
                onClick={ScoreOfUser} >
=======
                  fontSize: '15px',
                  color: 'white',
                  background: '#4CAF50',
                  right: '12%',
                  top: '35px',
                  borderRadius: '30px',
                  boxShadow:
                    '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                  width: '120px',
                  position: 'absolute',
                  outline: 'none',
                  border: 'none',
                }}
                className="mt-2 mx-2"
                onClick={ScoreOfUser}
                
              >
>>>>>>> f2cf08d (UI made Better)
                Submit
              </Button>

              <Button
                variant="light"
<<<<<<< HEAD
                style={{ fontSize: 10, backgroundColor: "#BF0000"}}
                className="border border-warning btn btn-warning mt-2"
                onClick={handleLogout} >
                Log Out
              </Button>

=======
                style={{
                  fontSize: '15px',
                  color: 'white',
                  background: '#f44336',
                  right: '2%',
                  top: '35px',
                  borderRadius: '30px',
                  width: '120px',
                  position: 'absolute',
                  boxShadow:
                    '0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)',
                  outline: 'none',
                  border: 'none',
                }}
                className="border border-warning btn btn-warning mt-2 mx-2"
                onClick={handleLogout}
              >
                Log Out
              </Button>
>>>>>>> f2cf08d (UI made Better)
            </div>
          </div>
        </nav>
        <div
          className="container-fluid position-absolute"
          style={{
<<<<<<< HEAD
            top: "120px",
            left: "0",
            right: "0",
            bottom: "0",
            width: "100%",
            height: "100%",
          }} >
          {Questions.map((question, quesNum) => {
            return (
              <div key={question.id}>
                <div className="mt-5 border border-success shadow-lg p-3 mb-3 bg-body rounded" style={{color: "#404040", fontSize: "medium", backgroundColor: "#EEF2F0"}}>
                  {
                   question.image !== 0 ? <img src={question.image} alt=""/> : ""
                  }       
                <div>
                  {question.options.map((data, idx) => {
                    return (
                      <div key={idx} className="mb-3">

                        {dataOps.map((d, i) => 
                          <h2 className="fst-italic">
                            <button
                              className="btn mt-3 shadow-lg rounded"
                              style={{backgroundColor: userResponses?.[quesNum]?.[i] === "" ? "#EEF2F0" : "#3CCC2C", color: "#2F3235", fontSize: 30 }}
                              onClick={() =>
                                handleSelectOption(quesNum, i, d)
                              } >
                              {data[d]}
                            </button> 
                          </h2>
                        )}
                      </div>
                    )
                  })}
                </div>
=======
            top: '120px',
            left: '0',
            right: '0',
            bottom: '0',
            width: '100%',
            height: '100%',
          }}
        >
          {Questions.map((question, quesNum) => {
            return (
              <div key={question.id}>
                <div
                  className="mt-5 border border-success shadow-lg p-3 mb-3 bg-body  rounded"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '90vw',
                    marginLeft:"35px",
                    backgroundImage:
                      'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
                  }}
                >
                  {question.image !== 0 ? (
                    <img src={question.image} alt="" />
                  ) : (
                    ''
                  )}
                  <div>
                    {question.options.map((data, idx) => {
                      return (
                        <div key={idx} className="mb-3">
                          {dataOps.map((d, i) => (
                            <h2 className="fst-italic">
                              <button
                                className="btn mt-3  rounded"
                                style={{
                                  backgroundColor:
                                    userResponses?.[quesNum]?.[i] === ''
                                      ? '#EEF2F0'
                                      : '#3CCC2C',
                                  color: '#2F3235',
                                  fontSize: '15px',
                                  width: '300px',
                                  height: '74px',
                                  boxShadow: '6px 6px 6px rgba(0, 0, 0, 0.60)',
                                }}
                                onClick={() =>
                                  handleSelectOption(quesNum, i, d)
                                }
                              >
                                {data[d]}
                              </button>
                            </h2>
                          ))}
                        </div>
                      )
                    })}
                  </div>
>>>>>>> f2cf08d (UI made Better)
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
<<<<<<< HEAD
}
=======
}
>>>>>>> f2cf08d (UI made Better)
