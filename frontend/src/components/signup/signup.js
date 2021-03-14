import React, { Component } from 'react';
import "./signup.css"
import FadeIn from 'react-fade-in';

function Email(props) {
    return <div className="email-box">
        <FadeIn>
        <div className="text">Enter your email</div>
        <div>
        <input className="input-box" value={props.value} onChange={props.onChange} />
        <button className="next-btn" onClick={props.onClick}>
        ᐳ
        </button>
        </div>
        </FadeIn>
    </div>


}

function Start(props) {
    return <div className="start-box">
        <FadeIn>
        <div><span className="start-title">Hello there!</span></div>
        <button className="start-btn" onClick={props.onClick}>
        Start
        </button>
        <div className="goto-login-block"
        >Have an account? <a href="/login" className="goto-login-btn">Login here</a></div>
        </FadeIn>
    </div>
}

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            page: 0
        }
        this.updateUsername = this.updateUsername.bind(this)
        this.changePage = this.changePage.bind(this)
    }


    changePage(number) {
        this.setState({ page: number })
    }

    updateUsername(e) {
        this.setState({ username: e.target.value })
    }

    render() {
        let block = 0;
        if (this.state.page == 0) {
            block = <Start onClick={() => this.changePage(1)} />
        } else if (this.state.page == 1) {
            block = <Email onClick={() => this.changePage(0)} onChange={this.updateUsername} value={this.state.value} />
        }
        return (
            <div className="signup-page">
                            <a href="/">
            <img className="logo-nav" src="/images/logotext.png" />
            </a>
            
                {block}
               
            </div>
        );
    }
}

export default SignUp;