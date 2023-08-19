import React from "react";

const Controls = ({ onStartPause, onReset, isRunning }) => {
    return(
        <div className="tadam-controls">
            <button onClick={onStartPause}>{isRunning ? "Pause" : "Start"}</button>
            <button onClick={onReset}>Reset</button>
        </div>
    )
}

export default Controls;