import React, { Component } from 'react';
import "./signup.css"
import FadeIn from 'react-fade-in';
import $ from 'jquery'

function InputField(props) {
    return <div className="email-box">
        <FadeIn>
            <div className="text">{props.label}</div>
            <div>
                <input
                    className="input-box" value={props.value} onChange={props.onChange} />
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
    return <div className="result-box">
        <FadeIn>
            <div className="start-title endtitle"> Thank you for signing up!</div>
            <a className="end-link" href="/login"> Go to Login</a>
        </FadeIn>
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
        this.goBack = this.goBack.bind(this);
    }


    async changePage(number) {
        console.log(number - 1 == 1 && this.state.name == "")
        if ((number - 1 == 1 && this.state.name == "") ||
            (number - 1 == 3 && this.state.username == "") ||
            (number - 1 == 4 && (this.state.username == "" ||
                isNaN(parseInt(this.state.age))))) {
            setTimeout(
                () => {
                    $('.text').css("transform", "translateY(0px)")
                }, 200)
            $('.text').css("transform", "translateY(-25px)")
            return;
        } else {

            await this.setState({ page: -1 })
            setTimeout(this.setState({ page: number }), 1000);
        }
    }

    async goBack() {
        let page = this.state.page
        await this.setState({ page: -1 })
        if (page == 3) {
            this.setState(prevState => ({ page: page - 2 }))
        } else {
            this.setState(prevState => ({ page: page - 1 }))
        }
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

    load() {
        this.setState({ page: -1 })
        setTimeout(this.setState({ page: 4 }), 500);
    }
    render() {
        let block = 0;
        if (this.state.page == 0) {
            block = <Start onClick={() => this.changePage(1)} />
        } else if (this.state.page == 1) {
            block = <InputField handleKeyPress={this.handleKeyPress}
                label="Let’s start off with your name" onClick={() => this.changePage(2)} onChange={this.updateName} value={this.state.name} />
        } else if (this.state.page == 2) {
            block = <FadeIn className="welcome-box">
                <div className="start-title">
                    Welcome {this.state.name}!
            <button className="cont-btn" onClick={() => this.changePage(3)}>ᐳ</button>
                </div>
            </FadeIn>
        } else if (this.state.page == 3) {
            block = <InputField handleKeyPress={this.handleKeyPress}
                label="Enter your email" onClick={() => this.changePage(4)} onChange={this.updateUsername} value={this.state.username} />
        } else if (this.state.page == 4) {
            block = <InputField handleKeyPress={this.handleKeyPress}
                label="Enter your age" onClick={() => this.changePage(5)} onChange={this.updateAge} value={this.state.Age} />
        } else if (this.state.page == 5) {

            var data = "&age=" + this.state.age;
            data += "&emoji=:)"
            data += "&name=" + this.state.name;
            data += "&imageurl=" + "RANDOM";
            data += "&audiourl=" + "jeff+is+a+dancer";
            data = "https://facetextcontent.herokuapp.com/create_user?" + data;

            console.log(data);
            fetch(data)
            .then(response => response.json())
            .then(data => {
              console.log(data) // Prints result from `response.json()` in getRequest
            })
            .catch(error => console.error(error))
            block = <Result />


        }
        return (

            <div className="signup-page">
                <a href="/">
                    <img className="logo-nav" src="/images/logotext.png" />
                </a>
                {block}
                {(this.state.page != 0 && this.state.page != 5) ?
                    (<div className="back-btn" onClick={this.goBack}>
                        ᐸᐸ
                </div>) : <div />
                }
            </div>
        );
    }
}

export default SignUp;
