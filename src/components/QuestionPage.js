import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { createRoutesFromChildren, useNavigate } from "react-router-dom";
import { ReactComponent as Alarm } from "../componentsImg/alarm.svg";
import Questions from "../questions/questions.json";
import PaperName from "../questions/paperOf.json";

export default function QuestionPage() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const history = useNavigate();
  const [userResponses, setUserResponses] = useState([]);
  const [score, setScore] = useState(0);


  const keyOfFireBase = [1, 2, 3, 4, 1]

  useEffect(() => {
    const responses = [];
    Questions.forEach((q)=>{
        let tempObject = {};
        tempObject[q.id] = "";
        responses.push(tempObject);
    });
    setUserResponses(responses);
  }, [Questions]);

  console.log(userResponses)

  const handleSelectOption = (id, selection, idx) => {
    let responses = [...userResponses];
    responses[idx][id] = selection;
    setUserResponses(responses);
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
  };

  const handleSubmit = () => {
    return 
  }

  async function handleLogout() {
    setError("");

    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  console.log(score);

  return (
    <>
      <div>
        <nav
          className="container-fluid fixed-top border"
          style={{ backgroundColor: "#C1CFC9" }}
          variant="light"
        >
          <div className="container-fluid d-flex" variant="light">
            <div className="container-fluid justify-content-center text-center mt-3 mb-2 ">
              <div style={{ fontSize: 30 }}> {PaperName.name} </div>
            </div>
            <div
              className="container justify-content-right text-center mt-2 mb-2"
              style={{ width: 80 }}
            >
              <Button
                variant="link"
                style={{ fontSize: 10 }}
                className="border border-warning btn btn-warning mt-2"
                onClick={handleLogout}
              >
                Log Out
              </Button>
            </div>
          </div>

          <div
            className="container-fluid d-flex mt-1"
            style={{ backgroundColor: "#C1CFC9" }}
          >
            <div className="container-fluid d-flex justify-content-center">
              <div className="contianer d-flex justify-center">
                <Alarm width="2rem" height="4rem" />
                <div className="container justify-center mt-3">
                  <div style={{ fontSize: 20 }} className="container d-flex">
                    65min : 20sec Left
                  </div>
                </div>
              </div>
            </div>
            <div
              className="container justify-right text-center mt-2 mb-2"
              style={{ width: 80 }}
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
                className="mt-2"
                onClick={ScoreOfUser}
              >
                Submit
              </Button>
            </div>
          </div>
        </nav>
        <div
          className="container-fluid border border-success position-absolute"
          style={{
            top: "150px",
            left: "0",
            right: "0",
            bottom: "0",
            width: "100%",
            height: "100%",
          }}
        >
          {Questions.map((question, idx) => {
            return (
              <div className="border" key={question.id}>
                <div className="border border-success">
                  {question.id}. {question.statement}
                </div>
                <div>
                  {question.options.map((data) => {
                    return (
                      <div>
                        <h2>
                          {" "}
                          <button
                            onClick={() =>
                              handleSelectOption(question.id, 1, idx)
                            }
                          >
                            A
                          </button>{" "}
                          {data.A}{" "}
                        </h2>
                        <h2>
                          {" "}
                          <button
                            onClick={() =>
                              handleSelectOption(question.id, 2, idx)
                            }
                          >
                            B
                          </button>{" "}
                          {data.B}{" "}
                        </h2>
                        <h2>
                          {" "}
                          <button
                            onClick={() =>
                              handleSelectOption(question.id, 3, idx)
                            }
                          >
                            C
                          </button>{" "}
                          {data.C}{" "}
                        </h2>
                        <h2>
                          {" "}
                          <button
                            onClick={() =>
                              handleSelectOption(question.id, 4, idx)
                            }
                          >
                            D
                          </button>{" "}
                          {data.D}{" "}
                        </h2>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

