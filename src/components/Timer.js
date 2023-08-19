import React from "react";

const Timer = ({minutes, seconds}) => {
    return (
        <div className="tadam-timer">
            <span>{String(minutes).padStart(2, '0')}:</span>
            <span>{String(seconds).padStart(2, '0')}</span>
        </div>
    );
}

export default Timer;