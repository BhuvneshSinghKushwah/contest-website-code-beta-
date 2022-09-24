import React from "react"
import { Link} from "react-router-dom"
import "../cssComponents/Info.css"

const InfoPage = ( {infoState, setinfoState } ) => {

  function handleChange(evt) {
    evt.preventDefault();
    const value = evt.target.value;
    setinfoState({
      ...infoState,
      [evt.target.name]: value
    });
  }

  return (
    <>
     <div className="wrapper">
        <div className="text-center mt-4 name">
            LNCT MCQ
        </div>
        <form className="p-3 mt-3">
          <p>Kindly fill the details below carefully!!</p>
            <div className="form-field d-flex align-items-center" id="fullName">
                <span className="far fa-user"></span>
                <input type="text" name="fullName" autoComplete="off"  placeholder="Enter your full name" deleteKeyCode={null} onChange={handleChange} label= "FullName" value={infoState.fullName} required/>
            </div>
            <div className="form-field d-flex align-items-center" id="enrollment">
                <span className="far fa-user"></span>
                <input type="text" name="enrollment" autoComplete="off" placeholder="Enter your enrollment" deleteKeyCode={null} onChange={handleChange}  label = "Enrollment" value={infoState.enrollment} required/>
            </div>
            <div className="form-field d-flex align-items-center" id="semester">
                <span className="far fa-user"></span>
                <input type="text" name="semester" autoComplete="off" placeholder="Enter your semester" deleteKeyCode={null} onChange={handleChange}  label = "Semester" value={infoState.semester} required/>
            </div>
           <Link to='/question-page'>
            <button className="btn mt-3">
                  Start Test
            </button>
           </Link>
        </form>
      </div>
    </>
  )
}

export default InfoPage