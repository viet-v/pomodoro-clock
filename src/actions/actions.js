import { BREAK_DECREMENT, BREAK_INCREMENT, COUNT_DOWN, PAUSE_TIME, PLAY_TIME, RESET_TIME, SESSION_DECREMENT, SESSION_INCREMENT } from "./constant"


export const sessionDecrement = () => ({ type: SESSION_DECREMENT });

export const sessionIncrement = () => ({ type: SESSION_INCREMENT });

export const breakIncrement = () => ({ type: BREAK_INCREMENT });

export const breakDecrement = () => ({ type: BREAK_DECREMENT });

export const resetTime = () => ({ type: RESET_TIME });

export const playTime = () => ({
    type: PLAY_TIME
})

export const pauseTime = () => ({
    type: PAUSE_TIME
})

export const countDown =()=>({
    type: COUNT_DOWN
})


