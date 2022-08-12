import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { createRoutesFromChildren, useNavigate } from "react-router-dom"
import { ReactComponent as Alarm} from '../componentsImg/alarm.svg'
import Questions from "../questions/questions.json"
import PaperName from "../questions/paperOf.json"

export default function QuestionPage() {
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
    <div>
        <nav className='container-fluid fixed-top border' style={{backgroundColor: '#C1CFC9'}} variant='light'>
            <div className='container-fluid d-flex' variant='light'>
                <div className='container-fluid justify-content-center text-center mt-3 mb-2 '>
                    <div style={{fontSize: 30}}> { PaperName.name } </div>
                </div>
                <div className="container justify-content-right text-center mt-2 mb-2" style={{width: 80}}> 
                    <Button variant='link' style={{fontSize: 10}} className='border border-warning btn btn-warning mt-2' onClick={handleLogout}>
                        Log Out
                    </Button>
                </div>
            </div>


            <div className="container-fluid d-flex mt-1" style={{backgroundColor: '#C1CFC9'}}>
                <div className="container-fluid d-flex justify-content-center" >
                    <div className="contianer d-flex justify-center" >
                        <Alarm  width='2rem' height='4rem' />
                        <div className='container justify-center mt-3'>
                            <div style={{ fontSize: 20 }} className='container d-flex'>
                                    65min : 20sec Left
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container justify-right text-center mt-2 mb-2" style={{width: 80}}> 
                    <Button variant='light' type="button" style={{fontSize: 15, color: 'white', background: '#11A770', border: "2.4px solid #11A770" }} className='mt-2'>
                        Submit
                    </Button>
                </div>
            </div>
        </nav>
        <div className="container-fluid border border-success position-absolute" style={{top: "150px",left: "0", right: "0", bottom: "0", width: "100%", height: "100%"}}>
        {
            Questions.map( Questions => {
                return (
                    <div className="border" key={Questions.id}>
                        <div className='border border-success'>
                           { Questions.id }.  { Questions.statement }
                        </div>
                        <div>
                            {
                                Questions.options.map( data => {
                                    return (
                                        <div>
                                            <h2> <button>A</button> { data.A } </h2>
                                            <h2> <button>B</button> { data.B } </h2>
                                            <h2> <button>C</button> { data.C } </h2>
                                            <h2> <button>D</button> { data.D } </h2>
                                        </div>
                                    )
                                } )
                            }
                        </div>
                    </div>
                )
            })
        }
        </div>
    </div>
    </>
    )
}
