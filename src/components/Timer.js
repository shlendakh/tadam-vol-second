import React from "react";
import './Timer.scss';

const Timer = ({minutes, seconds}) => {
    return (
        <div id="timer-label" className="tadam-timer">
            <span id="time-left">{String(minutes).padStart(2, '0')}:</span>
            <span>{String(seconds).padStart(2, '0')}</span>
        </div>
    );
}

export default Timer;