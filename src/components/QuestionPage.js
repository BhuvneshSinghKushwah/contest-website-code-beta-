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
  const [score, setScore] = useState(0);
  const [userResponses, setUserResponses] = useState([]);
  const dataOps = ['A', 'B', 'C', 'D']

  window.addEventListener('popstate', function(event){
    handleLogout();
  });

  const keyArr = ['A', 'B', 'C', 'B', 'C'];

  function handleEndPage() {
    history('/end-page',);
  }


  const initializeResponses = useCallback(() => {
    const responses = []
    for(let i = 0; i < Questions.length; i++) {
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
    setUserResponses(responses)
  };

  console.log(userResponses);

  function incrementScore() {
    setScore(prevScore => prevScore+1);
    setScore(score);
  };

  function ScoreOfUser() {
    // for(let i = 0; i < Questions.length; i++)
    // {
    //     let answer = optionKeys[i][1];
    //     let answerKey = optionKeys[i][0];

    //     if(userResponses[i][answerKey] === answer)
    //     {
    //       incrementScore();
    //     }
    // }
    // console.log(score);
    // handleEndPage();

    for(let i = 0; i < Questions.length; i++)
    {
       let res;
       for(let j = 0; j < 4; j++ )
       {
        if(!userResponses[i][j] || userResponses[i][j] !== 0)
        {
          res = userResponses[i][j];
        }
       }

       if(keyArr[i] === res)
       {
        incrementScore();
       }
       setScore(score);
    }
    console.log(score);
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
                  background: "#3CCC2C"
                }}
                className="mt-2 mx-2"
                onClick={ScoreOfUser} >
                Submit
              </Button>

              <Button
                variant="light"
                style={{ fontSize: 10, backgroundColor: "#E07204"}}
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
                <div className="mt-5 shadow-lg p-3 mb-3 bg-body rounded" style={{color: "#404040", fontSize: "medium", backgroundColor: "#EEF2F0"}}>
                  {question.id}. {question.statement}
                </div>
                <div>
                  {question.options.map((data, idx) => {
                    return (
                      <div key={idx} className="mb-3">

                        {dataOps.map((d, i) => 
                          <h2 className="fst-italic">
                            <button
                              className="btn btn-outline-dark border border-alert shadow-lg rounded"
                              style={{backgroundColor: userResponses?.[quesNum]?.[i] === "" ? "#EAEAEA" : "#3CCC2C", color: "#2F3235" }}
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