/// IMPORTS AND PRE REQS
var express = require("express");
var path = require("path");
var fs = require("fs");
var atob = require("atob");
var Sent = require("sentiment");
var admin = require("firebase-admin");
var pos = require('pos');
var natural = require('natural');
var synonyms = require("synonyms");
var cors = require("cors");
var tools = require("./tools")
var bodyParser = require('body-parser')
// CONSTANTS AND API KEYS
const PORT = process.env.PORT || 3000;
const speech = require('@google-cloud/speech');
const client = new speech.SpeechClient();
var serviceAccount = require("./shh.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hackm-307513-default-rtdb.firebaseio.com"
});

// Instancate OBJECTS
var app = express();
var ret = [];

var sent = new Sent();
var server = require("http").createServer(app);
var io = require("socket.io")(server);
app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({ limit: "5mb", extended: false }))
app.use(cors());


app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001/signup');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(express.static(__dirname + "/public"));

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
});
app.get("/data", function(req, res) {
	res.send(ret);
});

/*
tools.Local_Clear(function(){
  tools.Byte_Compare(bytes, function(answer){
    if (answer){
      res.send(answer);
    }else{
      res.send(["No Match"])
    }
    console.log(answer);
  })
})
*/
app.post("/in", function(req, res) {
  bytes = getBinary(req.body.productImage,'base64');

  console.log(bytes)
  tools.Local_Clear(function(){
    tools.Byte_Compare(bytes, function(answer){
      console.log(answer.FaceMatches)
      if (answer.FaceMatches[0].Similarity > 50) {
        Return_Data(answer.FaceMatches[0].Face.ExternalImageId, function(fi){
          ret = fi;
        })
      } else{
        ret = {
          "Age": "Fail",
          "Email": "Fail",
          "Image_Comparison": "Fail",
          "Name": "Fail"
      }
      }
    })
  });

  res.send(["yep"]);
});

app.post("/ah", function(req, res) {
  bytes = new Buffer.from(req.body.productImage,'base64');

  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;

  var title = name +age;
  
  console.log(title)
  tools.imgupload(title, bytes, function(answer){
    console.log("ok")
    add_User(title, age, email, name, "https://facecompare12.s3.ca-central-1.amazonaws.com/"+ title);
  })


  res.send(["yep"]);
});
app.get("/auth_test", function(req, res) {

	if (res){
		face = res.req.query.imageurl;
		text = res.req.query.audiourl;

    tools.Local_Clear(function(){
      tools.Face_Compare(face,function(answer) {
        console.log("Face confidence:" + (answer[0].Similarity).toString());
        if (answer && answer[0] && answer[0].Similarity > 50){
          Return_Confidence(answer[0].Face.ExternalImageId, text, function(ans, ret){
            console.log("Text confidence:" + ans.toString());
            if (ans > 40){
              res.send(ret);
            } else {
              res.send(["Face Found, but content doesnt match enough..."]);
            }
          });
        }else{
          	res.send(["No Face Match"]);
        }
      });
    });
	}else{
		console.log("No Beuno")
		res.send(["Fail"]);
	}

});



server.listen(PORT);
console.log("CHECKING PORT " + PORT);

async function quickstart() {
  // The path to the remote LINEAR16 file
  const gcsUri = 'gs://cloud-samples-data/speech/brooklyn_bridge.raw';

  // The audio file's encoding, sample rate in hertz, and BCP-47 language code
  const audio = {
    uri: gcsUri,
  };
  const config = {
    encoding: 'LINEAR16',
    sampleRateHertz: 16000,
    languageCode: 'en-US',
  };
  const request = {
    audio: audio,
    config: config,
  };

  // Detects speech in the audio file
  const [response] = await client.recognize(request);
  const transcription = response.results
    .map(result => result.alternatives[0].transcript)
    .join('\n');
  console.log(`Transcription: ${transcription}`);
}


// FUNCTIONS


// add_User ( ??? ???? ?????? ) Creates a user in the data database
//  Which stores the references for comparions for later, note that
//  the name of the parent is probs arbitrary... idk yet

async function add_User(PName, age, em, name, face) {

	admin.database().ref(PName).set({
		Name: name,
		Age: age,
		Email: em,
		Image_Comparison: face,
	});
}

async function Return_Confidence(UserID, Text, callback){

  var tru = true;
  var query = admin.database().ref().orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {

        // childData will be the actual contents of the child
        var childData = childSnapshot.val();
        if ((childData.Image_Comparison).localeCompare(UserID) == 0 && tru){
          tru = false;
          tools.Text_Closeness(childData.STT_Password,Text,function (cs){
            callback(cs, childData);
          });
        }


    });
  });

}

async function Return_Data(UserID, callback){
  console.log(UserID);
  var tru = true;
  var query = admin.database().ref().orderByKey();
  query.once("value")
    .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {

        var key = childSnapshot.key;

        if (key.localeCompare(UserID) == 0 && tru){
          tru = false;
          callback(childSnapshot.val());
        }


    });
  });
}

// Compare_To_User (FirebaseUser, Image, Text) Given a firebase
//   reference will return the relative confidence score of that
//   user being the actual user.
async function Compare_To_User(FID,FirebaseUser, Image, Text, callback) {
  var confidence = 0;
  tools.Text_Closeness(FirebaseUser.STT_Password,Text,function (answer){
    confidence += 0.4*answer;
    callback(confidence);
    tools.Face_Compare(Image,function(answer) {
    	console.log(answer);
      console.log(FID);
    });
  });

}


function getBinary(base64Image) {
  var binaryImg = atob(base64Image);
  var length = binaryImg.length;
  var ab = new ArrayBuffer(length);
  var ua = new Uint8Array(ab);
  for (var i = 0; i < length; i++) {
    ua[i] = binaryImg.charCodeAt(i);
  }

  return ab;
}

//console.log(tools.Text_Closeness("Jeff is a good singer sometimes",
//                     "Jeff is an ok dancer, but a great singer"));

//tools.Face_Compare("5efa68ad-1882-4f0e-8614-755a84a59fe9.jpg",function(answer) {
//	console.log(answer);
//});
