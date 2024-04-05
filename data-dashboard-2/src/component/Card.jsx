import React from "react";
import PropTypes from "prop-types";
//import {useState} from 'react';
import '../App.css';

const Card = (props) => {
    return (
        <div className="Card">
            <b>{props.txt}</b> {props.data}
        </div>
    )
}
Card.propTypes =  {
    txt: PropTypes.string,
    data: PropTypes.number
}
export default Card;