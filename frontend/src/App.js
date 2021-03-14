import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import WebcamCapture from './components/WebcamCapture'

export default class App extends Component{

    render(){
        return (
            <WebcamCapture></WebcamCapture>
            )
    }
}
