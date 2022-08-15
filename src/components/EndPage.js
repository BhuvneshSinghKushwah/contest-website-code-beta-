import React from 'react'
import { useLocation } from 'react-router-dom'
import QuestionPage from './QuestionPage'

const EndPage = () => {
    const location = useLocation();
    return (
    <div>EndPage { location.state.final}</div>
  )
}

export default EndPage