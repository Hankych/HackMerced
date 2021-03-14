import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'

export default class WebcamCapture extends Component{

    constructor(props){
        super(props);
        this.state = { screenshot: null }
    }
    screenshot() {
        var screenshot = this.refs.webcam.getScreenshot();
        console.log(screenshot);
        this.setState({screenshot: screenshot});
      }
      onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile)
        axios.post("http://localhost:8000/upload", data, {
       })
     .then(res => {
         console.log(res.statusText)
      })
     }

     upload() {
         
     }

    render(){
        return (
            <div>   
             <Webcam audio ={false} ref='webcam'/>
             <button onClick={this.screenshot.bind(this)}>Capture</button>
             { this.state.screenshot ? <img src={this.state.screenshot} /> : null }
            </div>
            )
    }
}
