import React from 'react';
import './CurrentWeatherDashboard.css';

const CurrentWeatherDashboard = (props) => {
    if (props.icon_id && props.temp && props.description) {
        return (
            <div className="ui segment container current-weather-dashboard">
                <img src={require("../icones/" + props.icon_id + ".png")} alt={props.description}></img>
                <span>&nbsp;{props.temp}&deg;</span>
                <span>{props.description}</span>
            </div>
        );
    }
    else {
        return (
            <div className="ui segment container current-weather-dashboard">
                <span>Loading...</span>
            </div>
        );
    }
}

export default CurrentWeatherDashboard;