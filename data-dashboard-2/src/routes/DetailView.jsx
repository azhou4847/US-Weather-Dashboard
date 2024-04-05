import React from "react";
import '../App.css';
import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
const DetailView = (props) => {
    let params = useParams();
    console.log("From the detail view");
    console.log(props.weeklyForecast[0]);

    return (
        <>
        <div id="detailViewContainer">
            <h3><b>📝 Weather Summary:</b></h3>
            <b>Date: {params.date}</b> <br/>
            
            <p>
            <b>Temperature:</b> Expect a high of [max_temp]°C and a low of [min_temp] F
            </p>

            <p>
            <b>Wind:</b> Winds will be blowing at [wind_spd] m/s from the [wind_cdir_full]
            </p>

            <p>
            <b>Precipitation:</b> There's a [pop]% chance of rain, with [precip]mm expected
            </p>

            <p>
            <b>Cloud Cover:</b> Cloud coverage is at [clouds]%
            </p>
            <p>
            <b>Sunrise/Sunset:</b> The sun will rise at [sunrise_time] and set at [sunset_time]
            </p>

            <p>
            <b>Moon Phase:</b> The moon is [moon_phase_description] with [moon_phase_illumination]% illumination
            </p>
        </div>
        </>
    );
  };
  
  DetailView.PropTypes = {
    weeklyForecast: PropTypes.object
  }
  export default DetailView;