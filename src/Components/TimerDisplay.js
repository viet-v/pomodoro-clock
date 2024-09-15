import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { countDown, pauseTime, playTime, resetTime } from '../actions/actions';
import { faPause } from '@fortawesome/free-solid-svg-icons';


function TimerDisplay() {

  const timeLeft = useSelector(state => state.timeLeft);
  const isRun = useSelector(state => state.isRun);
  const timerLabel = useSelector(state => state.timerLabel);

  const dispatch = useDispatch();
  const [isPlayIcon, setIsPlayIcon] = useState(true);

  // handle click #start_stop
  const handleClickStartPause = () => {
    if (isPlayIcon) {
      setIsPlayIcon(!isPlayIcon);
      dispatch(playTime());
    } else {
      setIsPlayIcon(!isPlayIcon);
      dispatch(pauseTime());
    }
  };

  // handle click reset btn
  const handleClickReset = () => {
    dispatch(resetTime());
    setIsPlayIcon(true);
    let audio = document.getElementById("beep");
    if (audio) {
      audio.pause(); // pause audio if user click reset
      audio.currentTime = 0;
    }
  }

  // function handle count down
  const handleCount = () => {
    const count = setInterval(() => {
      dispatch(countDown())
      console.log("run")
    }, 1000)
    return count
  }

  // handle when count down start and end
  useEffect(() => {
    let count
    if (isRun) {
      count = handleCount();
      console.log("run")
    } else {
      clearInterval(count)// cleanup function when isRun change
      console.log("stop")
    }
    return () => clearInterval(count); // ensure cleanup function when isRun change
  }, [isRun, dispatch]);

  // handle play audio
  useEffect(() => {
    if (timeLeft === 0) {
      let audio = document.getElementById("beep");
      if (audio) {
        audio.currentTime = 0;
        audio.play()
      }
    }

  }, [timeLeft])

  // convert time
  const min = Math.floor(timeLeft / 60);
  const sec = timeLeft % 60;

  return (
    <div className='box-time'>
      <div id="timer-label">
        {timerLabel}
      </div>
      <div id="time-left">
        {/* convert time to MM:SS */}
        {`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`}
      </div>
      <div className="list-btn">
        <div id="start_stop" onClick={handleClickStartPause}>
          <span>{isPlayIcon ? <FontAwesomeIcon icon={faPlay} /> : <FontAwesomeIcon icon={faPause} />}</span>
        </div>
        <div id="reset"
          onClick={handleClickReset}
        >
          <span><FontAwesomeIcon icon={faArrowsRotate} /></span>
        </div>
      </div>
      <audio id="beep" preload="auto" src='https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav' ></audio>
    </div>
  );
}

export default TimerDisplay;
