import React from "react";
import './Settings.scss';

const Settings = ({ label, labelId, time, onIncrease, onDecrease, onTimeChange }) => {

    return (
        <div className="tadam-settings">
            <label id={labelId + "-time"}>{label}</label>
            <input
                type="number"
                value={time}
                onChange={(e) => onTimeChange(e, label)}
                min="1"
                id={labelId + "-length"}
            />
            <div className="plus-minus">
                <button id={labelId + "-increment"} onClick={() => onIncrease(label)}>+</button>
                <button id={labelId + "-decrement"}onClick={() => onDecrease(label)}>⁃</button>
            </div>
        </div>
    );
}

export default Settings;