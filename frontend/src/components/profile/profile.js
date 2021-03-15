import React, { Component } from 'react';
import "./profile.css"
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import * as animationData from '../animation.json';
import axios from 'axios';

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "Hank",
            age: "18",
            email: "hank's email"
        }
    }

    getRequest = () => {
        axios.get("http://awesomeserver/users.username%27")
      .then( (response) => {
        console.log("response", response);
        this.setState({
          fetchUser: response.data
        });
        console.log("fetchUser", this.state.fetchUser);
      })
      .catch( (error) => {
        console.log(error);
      });
    }


    render() {
        const defaultOptions = {
            loop: false,
            autoplay: true, 
            animationData:animationData.default,
            rendererSettings: {
              preserveAspectRatio: 'xMidYMid slice'
            }
          };

        return (
            <div>
            <div className="nav-bar">
            <a href="/signup">
            <button className="demo-btn">Demo</button>
            </a>
            </div>
            
            <div className="landing-page">
                    <div className="landing-text">
                    <FadeIn>
                    <ul className="profile-list">
                        <li className="profile-text">Profile</li>
                        <li>Name: {this.state.name}</li>
                        <li>Age: {this.state.age}</li>
                        <li>Email: {this.state.email}</li>
                    </ul>
                        </FadeIn>
                </div>
            </div>
            </div>
        );
    }
}

export default Profile;