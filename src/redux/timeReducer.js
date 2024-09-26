import { SESSION_DECREMENT, SESSION_INCREMENT, BREAK_INCREMENT, BREAK_DECREMENT, RESET_TIME, PLAY_TIME, PAUSE_TIME, COUNT_DOWN } from "../actions/constant";

const initialState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 25 * 60, // set time in sec
  isRun: false,
  isBreak: false,
  timerLabel: "Session",
}

const timeReducer = (state = initialState, action) => {

  const { breakLength, sessionLength, timeLeft, isRun, isBreak } = state;

  switch (action.type) {

    case SESSION_DECREMENT:
      // we can't change timeLeft value when "isRun": true, and if "isBreak":true  timeLeft shouldn't change value
      if (isRun) {
        return {
          ...state,
          sessionLength: Math.max(sessionLength - 1, 1),
        }
      } else {
        return {
          ...state,
          sessionLength: Math.max(sessionLength - 1, 1),
          timeLeft: isBreak ? timeLeft : Math.max(sessionLength - 1, 1) * 60,
        }
      }

    case SESSION_INCREMENT:
      // we can't change timeLeft value when "isRun": true, and if "isBreak":true  timeLeft shouldn't change value
      if (isRun) {
        return {
          ...state,
          sessionLength: Math.min(sessionLength + 1, 60),
        }
      } else {
        return {
          ...state,
          sessionLength: Math.min(sessionLength + 1, 60),
          timeLeft: isBreak ? timeLeft : Math.min(sessionLength + 1, 60) * 60,
        }
      }

    case BREAK_DECREMENT:
      // we can't change timeLeft value when "isRun": true, and if "isBreak":false  timeLeft shouldn't change value
      if (isRun) {
        return {
          ...state,
          breakLength: Math.max(breakLength - 1, 1),
        }
      } else {
        return {
          ...state,
          breakLength: Math.max(breakLength - 1, 1),
          timeLeft: !isBreak ? timeLeft : Math.max(breakLength - 1, 1) * 60,
        }
      }


    case BREAK_INCREMENT:
      // we can't change timeLeft value when "isRun": true, and if "isBreak":false  timeLeft shouldn't change value
      if (isRun) {
        return {
          ...state,
          breakLength: Math.min(breakLength + 1, 60),
        }
      } else {
        return {
          ...state,
          breakLength: Math.min(breakLength + 1, 60),
          timeLeft: !isBreak ? timeLeft : Math.min(breakLength + 1, 60) * 60,
        }
      }

    case RESET_TIME:
      return { ...initialState }

    case PLAY_TIME:
      return {
        ...state,
        isRun: true
      }

    case PAUSE_TIME:
      return {
        ...state,
        isRun: false
      }

    case COUNT_DOWN:
      if (isRun) {
        if (timeLeft > 0) {
          return {
            ...state,
            timeLeft: timeLeft - 1,
          }
        } else {
          // switch between session and break
          return {
            ...state,
            isBreak: !isBreak,
            timeLeft: isBreak ? sessionLength * 60 : breakLength * 60,
            timerLabel: isBreak ? "Session" : "Break",
          }
        }
      }
      break;

    default:
      return state
  }
}

export default timeReducer;