/// IMPORTS AND PRE REQS
var express = require("express");
var path = require("path");
var fs = require("fs");
var atob = require("atob");
var Sent = require("sentiment");
var admin = require("firebase-admin");
const fetch = require("node-fetch");

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

adduser(1);
async function adduser(x) {
  console.log(x);

	admin.database().ref(x).set({
		Name: 2,
		Age: 17,
		Emoji: "lol",
		STT_Password: "My name is jeff hahaha funny",
		Image_Comparison: "Some link to google"
	});
}
