import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';


function TimerDisplay() {
  const { breakLength, sessionLength, timeLeft, isRun, isBreak, timerLabel } = useSelector(state => state);
  const dispatch = useDispatch()
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60

  return (
    <div className='box-time'>
      <div id="timer-label">
        {timerLabel}
      </div>
      <div id="timer-left">
      {`${min<10? "0":""}${min} : ${sec<10?"0":""}${sec}`}
      </div>
    </div>
  )
}

export default TimerDisplay