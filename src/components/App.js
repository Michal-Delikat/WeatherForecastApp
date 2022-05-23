import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "./App.css";
import CurrentWeatherDashboard from './CurrentWeatherDashboard';
import HourlyDashboard from './HourlyDashboard';
import DailyDashboard from './DailyDashboard';

const App = () => {
    //State initialization
    const [coords, setCoords] = useState({lat: null, lon: null});
    const [city, setCity] = useState(null);
    const [currentWeather, setCurrentWeather] = useState({current_icon_id: null, current_temp: null, current_description: null});
    const [hourlyForecast, setHourlyForecast] = useState([]);
    const [dailyForecast, setDailyForecast] = useState([]);
    //Get user coords
    useEffect(() => {
        window.navigator.geolocation.getCurrentPosition(
            pos => setCoords({lat: pos.coords.latitude, lon: pos.coords.longitude}),
            error => console.log(error));
    }, []);
    //Get weather data
    useEffect(() => {
        if (coords.lat && coords.lon) { 
            //Get user location based on coordinates
            axios.get('https://api.geoapify.com/v1/geocode/reverse', {params: { lat: coords.lat, lon: coords.lon, type: "city", apiKey: "44a883a230894ea582f243ffe0525f31"}})
                .then((location_response) => {
                    //Log location
                    //console.log(location_response);
                    //Save location
                    setCity(location_response.data.features[0].properties.city);
                    //Get weather
                    axios.get('https://api.openweathermap.org/data/2.5/onecall', 
                        {params: { lat: coords.lat, lon: coords.lon, exclude: 'minutely', appid: "ebb06c8d5f893e67e69ac3fc4c1eb90e", units: "metric" }})
                        .then((weather_response) => {
                            //Log weather
                            //console.log(weather_response);
                            //Save weather
                            setCurrentWeather({
                                current_icon_id: weather_response.data.current.weather[0].icon,
                                current_temp: Math.round(weather_response.data.current.temp), 
                                current_description: weather_response.data.current.weather[0].main
                            })
                            setHourlyForecast([...weather_response.data.hourly.slice(0,24)]);
                            setDailyForecast([...weather_response.data.daily.slice(1, 8)]);
                        })
                        .catch(err => {console.log(err)});
                })
                .catch(err => {console.log(err)});
        }
    }, [coords]);
    
    return (
        <div className="app">
            <h1 className="app-title">My Weather App</h1>
            <h2 className="location">{city}</h2> 
            <CurrentWeatherDashboard 
                icon_id={currentWeather.current_icon_id}
                temp={currentWeather.current_temp}
                description={currentWeather.current_description}
            />
            <HourlyDashboard hourly={hourlyForecast}/>
            <DailyDashboard daily={dailyForecast}/>
            <p className="powered-by">Powered by openweathermap.org</p>
        </div>
    );
}

export default App;