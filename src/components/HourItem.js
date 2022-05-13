import React from 'react';
import "./HourItem.css";

const HourItem = (props) => {
    return (
        <div className="hour-item">
            <h1 className="hour">{props.hour}</h1>
            <img alt={props.weather_desc} src={require("../icones/" + props.icon_code + ".png")}></img>
            <h1 className="hour-temp">&nbsp;{props.temp}&deg;</h1>
        </div>
    );
}

export default HourItem;