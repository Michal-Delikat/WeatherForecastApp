import React from 'react';
import './HourlyDashboard.css';
import HourItem from './HourItem';

const HourlyDashboard = (props) => {
    if (props.hourly) {
        const list = props.hourly.map(item => {
            var date = new Date(item.dt * 1000);
            var hour = date.getHours();
            return <HourItem key={date} hour={hour} icon_code={item.weather[0].icon} temp={Math.round(item.temp)}/>
        } 
        )
        return (
            <div className="ui segment container hourly-dashboard">
                {list}
            </div>
        );
    }
    else {
        return (
            <div className="ui segment container hourly-dashboard">
                <div>Hourly Dashboard</div>
            </div>
        )
    }
};

export default HourlyDashboard;