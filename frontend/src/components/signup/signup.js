import React, { Component } from 'react';
import "./signup.css"
import FadeIn from 'react-fade-in';
import WebcamCapture from '../WebcamCapture'
import AudioRecord from '../AudioRecord'
import xtype from 'xtypejs'
import $ from 'jquery'
import axios from 'axios';

//  var aws = require('aws-sdk');
// require('dotenv').config(); // Configure dotenv to load in the .env file
// // Configure aws with your accessKeyId and your secretAccessKey
//
// var albumBucketName = "localrawbucket";
// var bucketRegion = "ca-central-1";
// var IdentityPoolId = "AKIAYBAQPRKC5X5QMF42";
//
// const config = {
//     accessKeyId: "AKIAQJA33FRRIO3CBXJA",
//     secretAccessKey: "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",
//     region: "ca-central-1"
//
// };
// rekognition = new AWS.Rekognition(config)
//
// AWS.config.update({
//   region: bucketRegion,
//   credentials: new AWS.CognitoIdentityCredentials({
//     IdentityPoolId: IdentityPoolId
//   })
// });
//
// var s3 = new AWS.S3({
//   apiVersion: "2006-03-01",
//   params: { Bucket: albumBucketName }
// });
//
// function listAlbums() {
//   s3.listObjects({ Delimiter: "/" }, function(err, data) {
//     if (err) {
//       return alert("There was an error listing your albums: " + err.message);
//     } else {
//       var albums = data.CommonPrefixes.map(function(commonPrefix) {
//         var prefix = commonPrefix.Prefix;
//         var albumName = decodeURIComponent(prefix.replace("/", ""));
//         return getHtml([
//           "<li>",
//           "<span onclick=\"deleteAlbum('" + albumName + "')\">X</span>",
//           "<span onclick=\"viewAlbum('" + albumName + "')\">",
//           albumName,
//           "</span>",
//           "</li>"
//         ]);
//       });
//       var message = albums.length
//         ? getHtml([
//             "<p>Click on an album name to view it.</p>",
//             "<p>Click on the X to delete the album.</p>"
//           ])
//         : "<p>You do not have any albums. Please Create album.";
//       var htmlTemplate = [
//         "<h2>Albums</h2>",
//         message,
//         "<ul>",
//         getHtml(albums),
//         "</ul>",
//         "<button onclick=\"createAlbum(prompt('Enter Album Name:'))\">",
//         "Create New Album",
//         "</button>"
//       ];
//       document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//     }
//   });
// }
//
// function createAlbum(albumName) {
//   albumName = albumName.trim();
//   if (!albumName) {
//     return alert("Album names must contain at least one non-space character.");
//   }
//   if (albumName.indexOf("/") !== -1) {
//     return alert("Album names cannot contain slashes.");
//   }
//   var albumKey = encodeURIComponent(albumName);
//   s3.headObject({ Key: albumKey }, function(err, data) {
//     if (!err) {
//       return alert("Album already exists.");
//     }
//     if (err.code !== "NotFound") {
//       return alert("There was an error creating your album: " + err.message);
//     }
//     s3.putObject({ Key: albumKey }, function(err, data) {
//       if (err) {
//         return alert("There was an error creating your album: " + err.message);
//       }
//       alert("Successfully created album.");
//       viewAlbum(albumName);
//     });
//   });
// }
//
// function viewAlbum(albumName) {
//   var albumPhotosKey = encodeURIComponent(albumName) + "/";
//   s3.listObjects({ Prefix: albumPhotosKey }, function(err, data) {
//     if (err) {
//       return alert("There was an error viewing your album: " + err.message);
//     }
//     // 'this' references the AWS.Response instance that represents the response
//     var href = this.request.httpRequest.endpoint.href;
//     var bucketUrl = href + albumBucketName + "/";
//
//     var photos = data.Contents.map(function(photo) {
//       var photoKey = photo.Key;
//       var photoUrl = bucketUrl + encodeURIComponent(photoKey);
//       return getHtml([
//         "<span>",
//         "<div>",
//         '<img style="width:128px;height:128px;" src="' + photoUrl + '"/>',
//         "</div>",
//         "<div>",
//         "<span onclick=\"deletePhoto('" +
//           albumName +
//           "','" +
//           photoKey +
//           "')\">",
//         "X",
//         "</span>",
//         "<span>",
//         photoKey.replace(albumPhotosKey, ""),
//         "</span>",
//         "</div>",
//         "</span>"
//       ]);
//     });
//     var message = photos.length
//       ? "<p>Click on the X to delete the photo</p>"
//       : "<p>You do not have any photos in this album. Please add photos.</p>";
//     var htmlTemplate = [
//       "<h2>",
//       "Album: " + albumName,
//       "</h2>",
//       message,
//       "<div>",
//       getHtml(photos),
//       "</div>",
//       '<input id="photoupload" type="file" accept="image/*">',
//       '<button id="addphoto" onclick="addPhoto(\'' + albumName + "')\">",
//       "Add Photo",
//       "</button>",
//       '<button onclick="listAlbums()">',
//       "Back To Albums",
//       "</button>"
//     ];
//     document.getElementById("app").innerHTML = getHtml(htmlTemplate);
//   });
// }
//
// function addPhoto(albumName) {
//   var files = document.getElementById("photoupload").files;
//   if (!files.length) {
//     return alert("Please choose a file to upload first.");
//   }
//   var file = files[0];
//   var fileName = file.name;
//   var albumPhotosKey = encodeURIComponent(albumName) + "/";
//
//   var photoKey = albumPhotosKey + fileName;
//
//   // Use S3 ManagedUpload class as it supports multipart uploads
//   var upload = new AWS.S3.ManagedUpload({
//     params: {
//       Bucket: albumBucketName,
//       Key: photoKey,
//       Body: file
//     }
//   });
//
//   var promise = upload.promise();
//
//   promise.then(
//     function(data) {
//       alert("Successfully uploaded photo.");
//       viewAlbum(albumName);
//     },
//     function(err) {
//       return alert("There was an error uploading your photo: ", err.message);
//     }
//   );
// }
//
// function deletePhoto(albumName, photoKey) {
//   s3.deleteObject({ Key: photoKey }, function(err, data) {
//     if (err) {
//       return alert("There was an error deleting your photo: ", err.message);
//     }
//     alert("Successfully deleted photo.");
//     viewAlbum(albumName);
//   });
// }
//
// function deleteAlbum(albumName) {
//   var albumKey = encodeURIComponent(albumName) + "/";
//   s3.listObjects({ Prefix: albumKey }, function(err, data) {
//     if (err) {
//       return alert("There was an error deleting your album: ", err.message);
//     }
//     var objects = data.Contents.map(function(object) {
//       return { Key: object.Key };
//     });
//     s3.deleteObjects(
//       {
//         Delete: { Objects: objects, Quiet: true }
//       },
//       function(err, data) {
//         if (err) {
//           return alert("There was an error deleting your album: ", err.message);
//         }
//         alert("Successfully deleted album.");
//         listAlbums();
//       }
//     );
//   });
// }

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
