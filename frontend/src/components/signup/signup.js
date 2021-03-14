import React, { Component } from 'react';
import "./signup.css"
import FadeIn from 'react-fade-in';
import WebcamCapture from '../WebcamCapture'
import AudioRecord from '../AudioRecord'
import $ from 'jquery'
import axios from 'axios';

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
            page: 0,
            imgData: "",
            audioData: null,
            name: "h",
            age: "",
            page: 0
        }
        this.updateUsername = this.updateUsername.bind(this)
        this.updateName = this.updateName.bind(this)
        this.updateAge = this.updateAge.bind(this)
        this.changePage = this.changePage.bind(this)
        this.getImgData = this.getImgData.bind(this)
        this.logImgData = this.logImgData.bind(this)
        this.getAudioData = this.getAudioData.bind(this)
        this.logAudioData = this.logAudioData.bind(this)
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

    getImgData = (childData) => {
        this.setState({imgData: childData})
        console.log(this.state.imgData)
    }

    logImgData() {
        console.log(this.state.imgData)
    }

    getAudioData = (childData) => {
        this.setState({audioData: childData})
        console.log(this.state.audioData)
    }

    logAudioData() {
        console.log(this.state.audioData)
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
            block = <div>
                <div>
                    <WebcamCapture parentCallback = {this.getImgData}/>
                </div>
                <div>
                    <AudioRecord parentCallback = {this.getAudioData}/>
                </div>
                <button onClick={this.logImgData}>Console log imgData</button>
                <button onClick={this.logAudioData}>Console log audioData</button>
            </div>
        } else if (this.state.page == 6) {
            block = <Result />
        }
        return (
            <div className="signup-page">
              <a href="/">
            <img className="logo-nav" src="/images/logotext.png" />
            </a>
            {block}
            {(this.state.page != 0 && this.state.page != 6) ?
              (<div className="back-btn" onClick={this.goBack}>
        </div>) : <div />
        }
            </div>
        );
    }
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      success : false,
      url : ""
    }
  }

  handleChange = (ev) => {
    this.setState({success: false, url : ""});

  }
  // Perform the upload
  handleUpload = (ev) => {
    let file = this.uploadInput.files[0];
    // Split the filename to get the name and type
    let fileParts = this.uploadInput.files[0].name.split('.');
    let fileName = fileParts[0];
    let fileType = fileParts[1];
    console.log("Preparing the upload");
    axios.post("http://localhost:3001/sign_s3",{
      fileName : fileName,
      fileType : fileType
    })
    .then(response => {
      var returnData = response.data.data.returnData;
      var signedRequest = returnData.signedRequest;
      var url = returnData.url;
      this.setState({url: url})
      console.log("Recieved a signed request " + signedRequest);

     // Put the fileType in the headers for the upload
      var options = {
        headers: {
          'Content-Type': fileType
        }
      };
      axios.put(signedRequest,file,options)
      .then(result => {
        console.log("Response from s3")
        this.setState({success: true});
      })
      .catch(error => {
        alert("ERROR " + JSON.stringify(error));
      })
    })
    .catch(error => {
      alert(JSON.stringify(error));
    })
  }


  render() {
    const Success_message = () => (
      <div style={{padding:50}}>
        <h3 style={{color: 'green'}}>SUCCESSFUL UPLOAD</h3>
        <a href={this.state.url}>Access the file here</a>
        <br/>
      </div>
    )
    return (
      <div className="App">
        <center>
          <h1>UPLOAD A FILE</h1>
          {this.state.success ? <Success_message/> : null}
          <input onChange={this.handleChange} ref={(ref) => { this.uploadInput = ref; }} type="file"/>
          <br/>
          <button onClick={this.handleUpload}>UPLOAD</button>
        </center>
      </div>
    );
  }
}

export default SignUp;
