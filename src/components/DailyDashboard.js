import React from 'react';
import './DailyDashboard.css';
import DayItem from './DayItem';

const DailyDashboard = (props) => {
    if (props.daily) {
        const list = props.daily.map(item => {
            var date = new Date (item.dt * 1000);
            const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
            return <DayItem key={date} day={weekday[date.getDay()]} icon_code={item.weather[0].icon} temp_min={Math.round(item.temp.min)} temp_max={Math.round(item.temp.max)}/>
        })
        return (
            <div className="ui segment container daily-dashboard">
                {list}
            </div>
        );
    }
    else {
        <div className="ui segment container daily-dashboard">
            <span>Loading...</span>
        </div>
    }
};

export default DailyDashboard;