import React, { Component } from 'react';
import "./landing.css"
import FadeIn from 'react-fade-in';
import Lottie from 'react-lottie';
import * as animationData from '../animation.json';

class Landing extends React.Component {
    constructor(props) {
        super(props);
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
                    <Lottie className="home-anim" options={defaultOptions}
              height={200}
              width={200}/>
                        <img className="landing-logo" src="/images/text.png" />
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
