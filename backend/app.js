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
var tools = require("./tools")
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
var sent = new Sent();
var server = require("http").createServer(app);
var io = require("socket.io")(server);


app.use(express.static(__dirname + "/public"));

// PAGE BUILDING STUFF
app.get("/", function(req, res) {
	res.sendFile(path.join(__dirname + "/index.html"));
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
quickstart();


// FUNCTIONS


// add_User ( ??? ???? ?????? ) Creates a user in the data database
//  Which stores the references for comparions for later, note that
//  the name of the parent is probs arbitrary... idk yet
add_User(1);
async function add_User(x) {
	console.log("NOW ADDING USER: ");
  console.log(x);

	admin.database().ref(x).set({
		Name: 2,
		Age: 17,
		Emoji: "lol",
		STT_Password: "My name is jeff hahaha funny",
		Image_Comparison: "Some link to google",
		Voice_Copy: "Some link to google host"
	});
}

// Compare_To_User (FirebaseUser, Image, Text) Given a firebase
//   reference will return the relative confidence score of that
//   user being the actual user.
async function Compare_To_User(FirebaseUser, Image, Text) {

	console.log("NOW COMPARING USER: ");
	console.log(FirebaseUser);

}

console.log(tools.Text_Closeness("Jeff is a good singer sometimes",
                     "Jeff is an ok dancer, but a great singer"));
