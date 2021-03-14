import React, { Component } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios'
import WebcamCapture from './components/WebcamCapture'

import Landing from "./components/landing/landing"
import Login from "./components/login/login"
import SignUp from "./components/signup/signup"
import Profile from "./components/profile/profile"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


export default class App extends Component{

    render(){
        return (
            <div className="app-container">
            <Router>
                    <Switch>
                        <Route exact path="/">
                            <Landing/>
                        </Route>
                        <Route path="/login">
                            <Login />
                        </Route>
                        <Route path="/signup">
                            <SignUp />
                        </Route>
                        <Route path="/logincam">
                            <WebcamCapture/>
                        </Route>
                        <Route path="/profile">
                            <Profile/>
                        </Route>
                    </Switch>
            </Router>
        </div>
            )
    }
}
