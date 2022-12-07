import React, { useEffect, useState} from "react";
import "./style.css";
import weatherMock from './mock.json';
import axios from 'axios';
import { Bars } from "react-loader-spinner";
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
              alert("You set wrong city name");
              break;
            }
            case 429: {
              alert("Too many request per second");
              break;
            }
            default: { 
              break;
            }
          }
        });
    }, [props.city]);
    
    return(
      // !isLoad
      // ? <Bars />
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
            <div>City name: {props.city}</div>
          <div>
          <div>
            <div>Longitude: {Weatherdata.coord.lon}</div>
            <div>Latitude: {Weatherdata.coord.lat}</div>
          </div>
          <div className="ww-weather">
            {Weatherdata.weather.map(el => (
            <div>
            <img src={`http://openweathermap.org/img/w/${el.icon}.png`} alt='' />
            Description: {el.description}
            </div>
            ))}
          </div>
        </div>

        </div>

        
      </div>
    );
}

export default Widget;