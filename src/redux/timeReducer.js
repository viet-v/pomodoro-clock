import { SESSION_DECREMENT, SESSION_INCREMENT, BREAK_INCREMENT, BREAK_DECREMENT } from "../actions/constant";

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60, // set time in sec
  isRun: true,
  isBreak: false,
  timerLabel: "Break",
}

const timeReducer = (state = initialState, action) => {
  const { breakLength, sessionLength, timeLeft, isRun, isBreak, timerLabel } = state;


  switch (action.type) {


    case SESSION_DECREMENT:

      return {
        ...state,
        sessionLength: isRun
          ? sessionLength : Math.max(sessionLength - 1, 1),
        timeLeft: !isRun && isBreak || isRun
          ? timeLeft : Math.max(sessionLength - 1, 1) * 60,
      }

    case SESSION_INCREMENT:
      return {
        ...state,
        sessionLength: isRun
          ? sessionLength : Math.min(sessionLength + 1, 60),
        timeLeft: !isRun && isBreak || isRun
          ? timeLeft : Math.min(sessionLength + 1, 60) * 60,
      }

    case BREAK_DECREMENT:
      return {
        ...state,
        breakLength: isRun 
          ? breakLength : Math.max(breakLength - 1, 1),
        timeLeft: !isRun && !isBreak || isRun
          ? timeLeft : Math.max(breakLength - 1, 1) * 60,
      }

    case BREAK_INCREMENT:
      return {
        ...state,
        breakLength: isRun
          ? breakLength : Math.min(breakLength + 1, 60),
        timeLeft: !isRun && !isBreak || isRun
          ? timeLeft : Math.min(breakLength + 1, 60) * 60,
      }



    default:
      return state
  }
}

export default timeReducer;