import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import DetailView from '../routes/DetailView';
//import {useState} from 'react';
import '../App.css';

const WeatherRecord = (props) => {
    return (
        <>
        <div id="forecast">
            <b>Date:</b> {props.date}
            <b>Max Temp (F):</b> {props.maxTemp}
            <b>Min Temp (F):</b> {props.minTemp}
            <b>Description:</b> {props.description}
            <p><Link to={`/${props.date}/${props.location}`}><b>Details</b></Link></p>
        </div>
        </>
    )
}
WeatherRecord.propTypes =  {
    date: PropTypes.string,
    description: PropTypes.string,
    maxTemp: PropTypes.number,
    minTemp: PropTypes.number,
    location: PropTypes.string
}
export default WeatherRecord;