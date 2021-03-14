import React, { Component } from 'react';
import "./landing.css"
import FadeIn from 'react-fade-in';

class Landing extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
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
                        <img className="landing-logo" src="/images/logotext.png" />
                        The future of cyber security
                        </FadeIn>
                </div>
                
                <FadeIn className="image-fade">
                <img className="landing-img" src="/images/landingimage.png" />
                </FadeIn>
            </div>
            </div>
        );
    }
}

export default Landing;