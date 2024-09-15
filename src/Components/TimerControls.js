import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sessionDecrement, sessionIncrement, breakIncrement, breakDecrement } from '../actions/actions';

function TimerControls() {
  const breakLength = useSelector(state => state.breakLength);
  const  sessionLength = useSelector(state => state.sessionLength);

  const dispatch = useDispatch()

  return (
    <div className='timer-control'>
      <div className="break-control">
        <div id="break-label">
          Break Length
        </div>
        <div className="btn-control">
          <button id="break-decrement"
           onClick={() => { dispatch(breakDecrement()) }}
          >
            <span>-</span>
          </button>
          <div className="btn-level" id="break-length">
            {breakLength}
          </div>
          <button id="break-increment" 
          onClick={() => { dispatch(breakIncrement()) }}
          >
            <span>+</span>
          </button>
        </div>
      </div>
      <div className="session-control">
        <div id="session-label">
          Session Length
        </div>
        <div className="btn-control">
          <button id="session-decrement"
            onClick={() => { dispatch(sessionDecrement()) }}
          >
            <span>-</span>
          </button>
          <div className="btn-level" id="session-length">
            {sessionLength}
          </div>
          <button id="session-increment"
            onClick={() => { dispatch(sessionIncrement()) }}
          >
            <span>+</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerControls