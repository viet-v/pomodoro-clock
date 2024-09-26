import gsap from 'gsap';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay';
import { countDown, pauseTime, playTime, resetTime } from '../actions/actions';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons/faArrowsRotate';


function TimerDisplay() {

  // take value from redux
  const isRun = useSelector(state => state.isRun);
  const timeLeft = useSelector(state => state.timeLeft);
  const timerLabel = useSelector(state => state.timerLabel);
  const isBreak = useSelector(state => state.isBreak);


  const dispatch = useDispatch();
  const [isPlayIcon, setIsPlayIcon] = useState(true);// use to display Play icon and pause icon.


  // handle click #start_stop 
  const handleClickStartPause = () => {
    if (isPlayIcon) {
      setIsPlayIcon(!isPlayIcon);
      dispatch(playTime()); // dispatch action Play when click
    } else {
      setIsPlayIcon(!isPlayIcon);
      dispatch(pauseTime());// dispatch action Pause when click
    }
  };

  // handle click reset btn
  const handleClickReset = () => {
    dispatch(resetTime());
    setIsPlayIcon(true);// ensure the icon will show play icon
    let audio = document.getElementById("beep");
    if (audio) {
      audio.pause(); // pause audio if user click reset
      audio.currentTime = 0;
    }
  }

  // function handle count down
  const handleCount = () => {
    const count = setInterval(() => {
      dispatch(countDown()) // dispatch action count down to update "timeLeft" once every second
    }, 1000)
    return count;
  }

  // handle when count down start and end
  useEffect(() => {
    let count;
    if (isRun) {
      count = handleCount();
      // console.log("run")
    } else {
      clearInterval(count)// cleanup function when "isRun" change
      // console.log("stop")
    }
    return () => clearInterval(count); // ensure cleanup when "isRun" change
  }, [isRun, dispatch]);

  // handle play audio
  useEffect(() => {
    // play audio when time left = 0
    if (timeLeft === 0) {
      let audio = document.getElementById("beep");
      if (audio) {
        audio.currentTime = 0;
        audio.play()
      }
    }

    // handle add animation and active class

    let timeLeftEl = document.getElementById("time-left");

    const removeActive = () => {
      let active = document.querySelector(".active");//check active if it have already we remove them
      if (active) {
        timeLeftEl.classList.remove("active")
        gsap.killTweensOf(timeLeftEl); // stop animation 
      }
    }
    if (isRun) {
      if (timeLeft < 11 && timeLeft > 0) {
        timeLeftEl.classList.add("active");

        //set animation
        gsap.fromTo("#time-left",
          { scale: 1 },
          {
            scale: 1.2,
            ease: "back.in(1)",
            yoyo: true,
            repeat: -1,
          })

      } else {
        removeActive();
      }
    } else {
      removeActive();
    }


    // add color depend on label time
    if (isBreak) {
      timeLeftEl.classList.add("active-break");
    } else {
      let activeClassTinme = document.querySelector(".active-break")
      if (activeClassTinme) {
        activeClassTinme.classList.remove("active-break");
      }
    }
  }, [timeLeft, isBreak, isRun])

  // convert time
  const min = Math.floor(timeLeft / 60); // convert timeLeft to min
  const sec = timeLeft % 60; // convert timeLeft to sec

  return (
    <div className='box-time'>
      <div id="timer-label" className={timerLabel === "Session" ? "" : "active-label"}>
        {timerLabel}
      </div>
      <div id="time-left">
        {/* convert time to MM:SS */}
        {`${min < 10 ? "0" : ""}${min}:${sec < 10 ? "0" : ""}${sec}`}
      </div>
      <div className="list-btn">
        <div id="start_stop" onClick={handleClickStartPause}>
          {/* check isPlayIcon to show play icon or pause icon */}
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
