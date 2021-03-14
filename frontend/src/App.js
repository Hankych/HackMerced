import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import WebcamCapture from './components/WebcamCapture'
import AudioRecord from './components/AudioRecord'


export default class App extends Component{

    render(){
        return (
            <div>
                <div>
                    <WebcamCapture></WebcamCapture>
                </div>
                <div>
                    <AudioRecord></AudioRecord>
                </div>
            </div>
            )
    }
}
