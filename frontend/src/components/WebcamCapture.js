import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'

export default class WebcamCapture extends Component{

    constructor(props){
        super(props);
        console.log(props);
        this.state = { screenshot: null }
    }
    screenshot() {
        var screenshot = this.refs.webcam.getScreenshot();
        this.setState({screenshot: screenshot});
        // for sending data to parent component - signup.js
        this.props.parentCallback(screenshot);
      }
      /*
      onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8000/upload", data, {
       })
     .then(res => {
         console.log(res.statusText)
      })
     }
     */

    render(){
        return (
            <div>
            <Webcam
               audio={false}
               height={720}
               ref={'webcam'}
               screenshotFormat="image/jpeg"
               width={1280}
               screenshotQuality = {1}
             />
             <button onClick={this.screenshot.bind(this)}>Capture</button>
             { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
            </div>
            )
    }
}
