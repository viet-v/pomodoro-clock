import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sessionDecrement, sessionIncrement, breakIncrement, breakDecrement } from '../actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

function TimerControls() {
  // take value from redux
  const breakLength = useSelector(state => state.breakLength);
  const sessionLength = useSelector(state => state.sessionLength);

  const dispatch = useDispatch()

  return (
    <div className='timer-control'>
      <div className="break-control">
        <div id="break-label">
          Break Length
        </div>
        <div className="btn-control">
          <button id="break-decrement"
            onClick={() => { dispatch(breakDecrement()) }} // dispatch action break decrement when click
          >
            <span><FontAwesomeIcon icon={faMinus} /></span>
          </button>
          <div className="btn-level" id="break-length">
            {breakLength}
          </div>
          <button id="break-increment"
            onClick={() => { dispatch(breakIncrement()) }}// dispatch action break increment when click
          >
            <span><FontAwesomeIcon icon={faPlus} /></span>
          </button>
        </div>
      </div>
      <div className="session-control">
        <div id="session-label">
          Session Length
        </div>
        <div className="btn-control">
          <button id="session-decrement"
            onClick={() => { dispatch(sessionDecrement()) }}// dispatch action session decrement when click
          >
            <span><FontAwesomeIcon icon={faMinus} /></span>
          </button>
          <div className="btn-level" id="session-length">
            {sessionLength}
          </div>
          <button id="session-increment"
            onClick={() => { dispatch(sessionIncrement()) }}// dispatch action session increment when click
          >
            <span><FontAwesomeIcon icon={faPlus} /></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TimerControls