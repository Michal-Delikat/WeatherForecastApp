import React from 'react';
import './DayItem.css';

const DayItem = (props) => {
    return (
        <div className="day-item">
            <span className="day-name">{props.day}</span>
            <img alt={props.weather_desc} src={require("../icones/" + props.icon_code + ".png")}></img>
            <span className="temp-range">{props.temp_min}&deg; - {props.temp_max}&deg;</span>
        </div>
    );
}

export default DayItem;