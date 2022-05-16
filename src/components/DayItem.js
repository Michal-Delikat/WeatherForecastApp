import React from 'react';
import './DayItem.css';

const DayItem = (props) => {
    const popInfo = props.pop > 0 ? (props.pop * 100).toString() + "%" : " "; 
    return (
        <div className="day-item">
            <span className="day-name">{props.day}</span>
            <div className="weather-icon">
                <div className='white-box'></div>
                <img alt={props.weather_desc} src={require("../icones/" + props.icon_code + ".png")}></img>
                <span>{popInfo}</span>
            </div>
            <div className="temp-range">
                <span>{props.temp_min}&deg;</span>
                <span>-</span>
                <span>{props.temp_max}&deg;</span>
            </div>
            <div className="day-range">
                <span className="label">Daytime:</span>
                <span>{props.sunrise} - {props.sunset}</span>
            </div>
            <div className='pressure'>
                <span>{props.pressure} hPa</span>
            </div>
        </div>
    );
}

export default DayItem;