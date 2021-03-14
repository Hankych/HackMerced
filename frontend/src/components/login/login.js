import React, { Component } from 'react';
import "./login.css"
import SignUp from "../signup/signup"
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import * as animationData from '../animation.json';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function LogEmail() {

    return <div className="login-box">
        <FadeIn>
            <div>
            <div className="text-box">
                <div className="title">Welcome back!</div>
                <div>New here? <a className="create-btn" href="/signup"> Create an account</a>
                </div>
            </div>
            <div>
            <div className="circle">
                <img className="logo" src="/images/idvision.png" />
            </div>
            <div>

                <div className="email-container">
                    <div className="label">Email</div>
                    <input />
                    <button className="next-btn">
                        ᐳ
                </button>
                </div>

            </div>
            </div>
            </div>
        </FadeIn>
    </div>

}
class Login extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {

        return (
            
            <div className="login-page">        
            <a href="/">
            <img className="logo-nav" src="/images/logotext.png" />
            </a>
                <LogEmail />
            </div>
        );
    }
}

export default Login;