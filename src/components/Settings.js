import React from "react";

const Settings = ({ label, time, onIncrease, onDecrease, onTimeChange }) => {
    return (
        <div className="tadam-settings">
            <label>{label}</label>
            <input 
                type="number" 
                value={time} 
                onChange={(e) => onTimeChange(e, label)}
                min="1"
            />
            <button onClick={() => onIncrease(label)}>+</button>
            <button onClick={() => onDecrease(label)}>-</button>
        </div>
    );
}

export default Settings;