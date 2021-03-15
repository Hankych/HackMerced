import React, { Component } from 'react';
import "./login.css"
import SignUp from "../signup/signup"
import FadeIn from 'react-fade-in';
import WebcamCapture from '../WebcamCapture'
import AudioRecord from '../AudioRecord'
import { Redirect } from "react-router-dom"
import Lottie from 'react-lottie';
import * as animationData from '../animation.json';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function SecurityQuestion() {
    return <div className="login-box">
        <FadeIn>
            <div>
            <div className="question">
                <div className="title">How much wood could a wood chuck chuck if a wood chuck could chuck wood</div>
            </div>
            </div>
        </FadeIn>
    </div>

}

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            imgData: null,
            audioData: null,
            redirect:null
        }
        this.getImgData = this.getImgData.bind(this)
        this.logImgData = this.logImgData.bind(this)
        this.getAudioData = this.getAudioData.bind(this)
        this.logAudioData = this.logAudioData.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    onSubmit = () => {
        // return <a href="/login" className="goto-login-btn">Login here</a>
    }

    getImgData = (childData) => {
        this.setState({imgData: childData})
        console.log(this.state.imgData)
    }

    logImgData() {
        console.log(this.state.imgData)

        var data = "https://facetextcontent.herokuapp.com/in";
        var thing = this.state.imgData;
        var update = thing.replace(/^data:image\/[a-z]+;base64,/, "");

        setTimeout(function(){
            fetch(data, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              productImage: update
            })
          }).then((response)=>{
            return <Redirect to={"/profile"}/>
          })
          .catch(console.log);
      }, 1000);
    }

    getAudioData = (childData) => {
        this.setState({audioData: childData})
        console.log(this.state.audioData)
    }

    logAudioData() {
        console.log(this.state.audioData)
    }


    render() {
      let block = 0;
      block = <div>
          <div>
              <WebcamCapture parentCallback = {this.getImgData}/>
          </div>
          <div>
              <AudioRecord parentCallback = {this.getAudioData}/>
          </div>
          <button onClick={this.logImgData}>Console log imgData</button>
          <button onClick={this.logAudioData}>Console log audioData</button>
          <button onClick={this.onSubmit}>View Profile</button>
      </div>
        return (

            <div className="login-page">

            <a href="/">
            <img className="logo-nav" src="/images/logotext.png" />
            </a>
                <SecurityQuestion/>
                <div className="centered">
                  {block}
                </div>
            </div>
        );
    }
}

export default Login;
