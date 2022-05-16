import React from 'react';
import axios from 'axios';
import "./App.css";
import CurrentWeatherDashboard from './CurrentWeatherDashboard';
import HourlyDashboard from './HourlyDashboard';
import DailyDashboard from './DailyDashboard';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = { lat: null, lon: null, city: null, current_icon_id: null, current_temp: null, current_description: null, hourly: [], daily: [] }
    }

    componentDidMount() {
        //Get user coordinates
        window.navigator.geolocation.getCurrentPosition(position => {
            //Log coordinates
            //console.log(position.coords.latitude, position.coords.longitude);
            //Save coordinates
            this.setState({lat: position.coords.latitude, lon: position.coords.longitude}, () => {
                //Get user location based on coordinates
                axios.get('https://api.geoapify.com/v1/geocode/reverse', {params: { lat: this.state.lat, lon: this.state.lon, type: "city", apiKey: "44a883a230894ea582f243ffe0525f31"}})
                .then((location_response) => {
                    //Log location
                    //console.log(location_response);
                    //Save location
                    this.setState({city: location_response.data.features[0].properties.city});
                    //Get weather
                    axios.get('https://api.openweathermap.org/data/2.5/onecall', {
                        params: { lat: this.state.lat, lon: this.state.lon, exclude: 'minutely', appid: "ebb06c8d5f893e67e69ac3fc4c1eb90e", units: "metric" }
                        }).then((weather_response) => {
                            //Log weather
                            console.log(weather_response);
                            //Save weather
                            this.setState({
                                current_icon_id: weather_response.data.current.weather[0].icon,
                                current_temp: Math.round(weather_response.data.current.temp), 
                                current_description: weather_response.data.current.weather[0].main,
                                hourly: [...weather_response.data.hourly.slice(0,24)],
                                daily: [...weather_response.data.daily.slice(1, 8)]
                            })
                        }).catch(err => {console.log(err)});
                }).catch(err => {console.log(err)});
            });
        }, error => console.log(error));
    }

    render() {
        return (
            <div className="app">
                <h1 className="app-title">My Weather App</h1>
                <h2 className="location">{this.state.city}</h2> 
                <CurrentWeatherDashboard 
                    icon_id={this.state.current_icon_id}
                    temp={this.state.current_temp}
                    description={this.state.current_description}
                />
                <HourlyDashboard hourly={this.state.hourly}/>
                <DailyDashboard daily={this.state.daily}/>
                <p className="powered-by">Powered by openweathermap.org</p>
            </div>
        );
    }
}

export default App;