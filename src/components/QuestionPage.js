import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import Questions from "../questions/questions.json";
import PaperName from "../questions/paperOf.json";


export default function QuestionPage() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();
  const [userResponses, setUserResponses] = useState([]);
  const [score, setScore] = useState(0);
  const dataOps = ['A', 'B', 'C', 'D']

  window.addEventListener('popstate', function(event){
    handleLogout();
  });

  const keyOfFireBase = [1, 2, 3, 4, 1];

  function handleEndPage() {
    history('/end-page',);
  }


  const initializeResponses = useCallback(() => {
    const responses = []
    for(let q in Questions) {
      responses.push(Array(4).fill(""))
    }
    setUserResponses([...responses])
  }, [])

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
    console.log(responses)
    setUserResponses(responses)
  };

  function incrementScore() {
    setScore(prevScore => prevScore+1);
  };

  function ScoreOfUser() {
    for(let i = 0; i < Questions.length; i++)
    {
        if(userResponses[i][i+1] === keyOfFireBase[i])
        {
            incrementScore();
        } 
    }
    handleEndPage();
  };



  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  return (
    <>
      <div>
        <nav
          className="container-fluid fixed-top border shadow-lg p-3 mb-5 bg-body rounded"
          style={{ backgroundColor: "#EEF2F0" }}
          variant="light"
        >
          <div className="container-fluid d-flex" variant="light">
            <div className="container-fluid justify-content-center text-center mt-3 mb-2 ">
              <div style={{ fontSize: 30 }}> {PaperName.name} </div>
            </div>
            <div
              className="container-fluid d-flex text-center mt-2 mb-2"
              style={{ width: 140 }}
            >
              <Button
                variant="light"
                type="button"
                style={{
                  fontSize: 15,
                  color: "white",
                  background: "#11A770",
                  border: "2.4px solid #11A770",
                }}
                className="mt-2 mx-2"
                onClick={ScoreOfUser} >
                Submit
              </Button>

              <Button
                variant="link"
                style={{ fontSize: 10 }}
                className="border border-warning btn btn-warning mt-2"
                onClick={handleLogout} >
                Log Out
              </Button>

            </div>
          </div>
        </nav>
        <div
          className="container-fluid position-absolute"
          style={{
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
                <div className="border border-success mt-2 shadow-lg p-3 mb-3 bg-body rounded" style={{color: "#404040", fontSize: "medium", backgroundColor: "#EEF2F0"}}>
                  {question.id}. {question.statement}
                </div>
                <div>
                  {question.options.map((data, idx) => {
                    return (
                      <div key={idx} className="mb-3">

                        {dataOps.map((d, i) => 
                          <h2 className="fst-italic">
                            <button
                              className="btn btn-outline-dark"
                              style={{backgroundColor: userResponses[idx] !== "" ? "white" : "green", color: "#2F3235" }}
                              onClick={() =>
                                handleSelectOption(quesNum, i, d)
                              } >
                              {d}
                            </button> {" "} 
                              {data[d]}{" "}
                          </h2>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}