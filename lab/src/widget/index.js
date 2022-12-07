import React, { useEffect, useState} from "react";
import "./style.css";
import weatherMock from './mock.json';
import axios from 'axios';
import icon from "./imgs/geo-alt-fill.svg"

function Widget (props) {
    const [isLoad, setIsLoad] = useState(false);
    const [Weatherdata, setWeatherdata] = useState(weatherMock);
    useEffect(() => {
        setIsLoad(false);
        axios
        .get(`https://api.openweathermap.org/data/2.5/weather?q=${props.city}&appid=3b704d72defefe06c75074c745ba6b87`)
        .then (response => {
          console.log(response.data);
          setWeatherdata(response.data);
          setIsLoad(true);
        }).catch(err => {
          console.log(err);
          switch (err.response.status) {
            case 401: {
              alert("Wrong api key was used");
              break;
            }
            case 404: {
              alert("You entered wrong city!");
              break;
            }
            case 429: {
              alert("Too many request per second!");
              break;
            }
            default: { 
              break;
            }
          }
        });
    }, [props.city]);

    return(
        <div className="widget">

          <div className="greeting-container">

            <div id="location-tag">
              <div><img src={icon} /></div>
              <div>
                <p id="current-location">Current Location</p>
                <p id="city-name">{props.city}</p>
              </div>
            </div>

            <div className="greeting-title">Weather Widget</div>
            <div className="line"></div>

          </div>

            <div className="info-container">

              <div className="info-title">General Info</div>

              <div className="general-info-container">
                <div>
                <div id="temperature">{(Weatherdata.main.temp - 273.15).toFixed(0)}°C</div>
                <div className="img-container">
                  {Weatherdata.weather.map(el => (<div>{el.description}</div>))}
                  {Weatherdata.weather.map(el => (<div><img src={`http://openweathermap.org/img/w/${el.icon}.png`} alt='' /></div>))}
                </div>
                </div>

                <div id="vertical-hr"></div>

                <div id="info">
                  <div>Feels Like: {(Weatherdata.main.feels_like - 273.15).toFixed(0)}°C</div>
                  <div>Humidity: {Weatherdata.main.humidity}%</div>
                  <div>Pressure: {Weatherdata.main.pressure}hPa</div>
                  <div>Longitude: {Weatherdata.coord.lon}</div>
                  <div>Latitude: {Weatherdata.coord.lat}</div>
                </div>
                
              </div>

              <div className="info-title">More</div>

              <div className="more-info-container">
                <div id="subcontainer">
                  <div className="info-subtitle">Wind</div>
                  <div id="info-text">Speed: {Weatherdata.wind.speed}m/s</div>
                  <div id="info-text">Direction: {Weatherdata.wind.deg}°</div>
                  <div id="info-text">Gust: {Weatherdata.wind.gust}m/s</div>
                </div>

                <div id="subcontainer">
                  <div className="info-subtitle">Other</div>
                  <div id="info-text">Cloudiness: {Weatherdata.clouds.all}%</div>
                  <div id="info-text">Visibility: {Weatherdata.visibility}m</div>
                </div>
              </div>
            
        </div>
      </div>
    );
}

export default Widget;