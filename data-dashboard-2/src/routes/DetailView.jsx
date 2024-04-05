import React from "react";
import '../App.css';
import { useParams,Link } from "react-router-dom";
import { useEffect, useState } from 'react'

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
const API_BASE_URL = `http://api.weatherbit.io/v2.0`;

const DetailView = () => {

    const [dayForecast, setDayForecast] = useState([]);
    let params = useParams();
    
    function tsToTime(UNIX_timestamp){
      var a = new Date(UNIX_timestamp * 1000);
      var hour = (a.getHours()) % 12;
      var min = a.getMinutes();
      var time =  hour + ':' + min ;
      return time;
    }
    
    function getMoonPhaseDescr(fraction) {
      console.log(fraction);
      let result = "";
      if (fraction >= 0 && fraction <= 0.49){
        result = "New Moon";
      }
      else if (fraction >= 0.5 && fraction <= 0.74) {
        result = "Full Moon";
      }
      else if (fraction >= 0.75) {
        result = "Last quarter moon";
      }
      return result;
    }
    
    async function getDayForecast() {
        //Get JSON
        const response = await fetch(API_BASE_URL+"/forecast/daily?city="+params.location+"&units=I&key="+ACCESS_KEY);
        const json = await response.json();
    
        //Calculate Weather Average
        let forecast = (json.data).splice(7,7); //why does this work? splice() isn't supposed to do this

        let result = forecast.filter((e) => { return e.datetime == params.date; });
        setDayForecast(result);
    }

    useEffect(() => {
      getDayForecast().catch(() => {
        //alert("Something went wrong with the search");
        console.error;
      });    
      console.log("Day Forecast Retrieved");
      console.log(dayForecast.max_temp);
    },[])


    return (
        <>
        {
          dayForecast.length > 0? (    
            <div id="detailViewContainer">
              <h3><b>📝 Weather Summary:</b></h3>

              <b>Date: {params.date}</b> <br/>
              
              <p>
              <b>Temperature:</b> Expect a high of {dayForecast[0].max_temp} F and a low of {dayForecast[0].min_temp} F
              </p>

              <p>
              <b>Wind:</b> Winds will be blowing at {dayForecast[0].wind_spd} m/s from the {dayForecast[0].wind_cdir_full}
              </p>

              <p>
              <b>Precipitation:</b> There's a {dayForecast[0].pop} % chance of rain, with {dayForecast[0].precip} mm expected
              </p>

              <p>
              <b>Cloud Cover:</b> Cloud coverage is at {dayForecast[0].clouds} %
              </p>
              <p>
              <b>Sunrise/Sunset:</b> The sun will rise at {tsToTime(dayForecast[0].sunrise_ts)} AM and set at {tsToTime(dayForecast[0].sunset_ts)} PM
              </p>

              <p>
              <b>Moon Phase:</b> The moon phase is {getMoonPhaseDescr(dayForecast[0].moon_phase_lunation)}  with {dayForecast[0].moon_phase * 100}% illumination
              </p>
              <p><Link to="/">Go Back</Link></p>
          </div>  
          )
          : null }
        </>
    );
  };
  export default DetailView;