import { BREAK_DECREMENT, BREAK_INCREMENT, SESSION_DECREMENT, SESSION_INCREMENT } from "./constant"


export const essionDecrement = () => ({ type: SESSION_DECREMENT });
export const essionIncrement = () => ({ type: SESSION_INCREMENT });
export const breakIncrement = () => ({ type: BREAK_INCREMENT });
export const breakDecrement = () => ({ type: BREAK_DECREMENT });



