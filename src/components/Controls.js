import React from "react";
import './Controls.scss';

const Controls = ({ onStartPause, onReset, isRunning }) => {
    return(
        <div className="tadam-controls">
            <button id="start_stop" onClick={onStartPause}>{isRunning ? "⏹" : "▶︎"}</button>
            <button id="reset" onClick={onReset}>↩︎</button>
        </div>
    )
}

export default Controls;