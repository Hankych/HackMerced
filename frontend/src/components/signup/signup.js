import React, { Component } from 'react';
import "./signup.css"
import FadeIn from 'react-fade-in';

function InputField(props) {
    return <div className="email-box">
        <FadeIn>
            <div className="text">{props.label}</div>
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

function Result() {
    return <div>
        <a href="/login"> goto login</a>
    </div>
}
class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            name: "h",
            age: "",
            page: 0
        }
        this.updateUsername = this.updateUsername.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateAge = this.updateAge.bind(this)
        this.changePage = this.changePage.bind(this)
    }


    async changePage(number) {
        await this.setState({page: -1})
        setTimeout(this.setState({page: number}), 1000);
    }

    updateUsername(e) {
        this.setState({ username: e.target.value })
    }

    updateName(e) {
        console.log("hi")
        this.setState({ name: e.target.value })
    }

    updateAge(e) {
        this.load();
        this.setState({ age: e.target.value })
    }

    load(){
        this.setState({page: -1})
        setTimeout(this.setState({page: 4}), 500);
    }
    render() {
        let block = 0;
        if (this.state.page == 0) {
            block = <Start onClick={() => this.changePage(1)} />
        } else if (this.state.page == 1) {
            block = <InputField label="Let’s start off with your name" onClick={() => this.changePage(2)} onChange={this.updateName} value={this.state.name} />
        } else if (this.state.page == 2) {
            block = <div>
                Welcome {this.state.name}!
            <button onClick={() => this.changePage(3)}>continue</button>
            </div>
        } else if (this.state.page == 3) {
            block = <InputField label="Enter your email" onClick={() => this.changePage(4)} onChange={this.updateUsername} value={this.state.username} />
        } else if (this.state.page==4){
            block = <InputField label="Enter your age" onClick={() => this.changePage(5)} onChange={this.updateAge} value={this.state.Age} />
        } else if (this.state.page==5) {
            block = <Result/>
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