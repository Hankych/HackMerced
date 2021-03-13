var pos = require('pos');
var natural = require('natural');
var synonyms = require("synonyms");
var aws = require("aws-sdk");

aws.config.loadFromPath('./config.json');

s3 = new aws.S3();
rek = new aws.Rekognition();

const WEIGHT_OF_PRIMARY = 2;
const SFP = 0.15;
const WEIGHT_OF_SECONDARY = 1;
const collectionName = "local";

module.exports = {

  // Text_Closeness (Corpus,  Text) Given a text and a reference
  //   to the useres answers, will return a scale of how close
  //   the two texts are

  Text_Closeness: async function (Corpus, Text) {

    var tagger = new pos.Tagger();
    var Testing= [];
    var Answers = [];


    // Create Struct for Answers
    if (Corpus){
      var words = new pos.Lexer().lex(Corpus);
      var taggedWords = tagger.tag(words);

      for (i in taggedWords) {
        var tag = taggedWords[i][1];

        var sample_word = taggedWords[i][0].toLowerCase();

        if (tag.substring(0,2) == "NN" ||
        tag.substring(0,2) == "VB" ||
        tag.substring(0,2) == "JJ"){

          var localtest = true;
          for (var i = 0; i < Answers.length; i++){
            if (Answers[i].primary == sample_word){
              localtest = false;
              Answers[i].mentions += 1;
              break;
            }
          }

          if(localtest){

            var synoms = synonyms(sample_word);

            var wordlist = [];

            if (synoms&& synoms.n ){wordlist = wordlist.concat(synoms.n);}
            if (synoms && synoms.v){wordlist = wordlist.concat(synoms.v);}
            if (synoms && synoms.s){wordlist = wordlist.concat(synoms.s);}
            if (synoms && synoms.r){wordlist = wordlist.concat(synoms.r);}

            var word = {
              primary: sample_word,
              secondary: wordlist,
              mentions: 1
            }


            Answers.push(word);
          }

        }
      }

    }

    // Create Struct for Input
    if (Text){
      var words = new pos.Lexer().lex(Text);
      var taggedWords = tagger.tag(words);

      for (i in taggedWords) {
        var tag = taggedWords[i][1];

        var sample_word = taggedWords[i][0].toLowerCase();

        if (tag.substring(0,2) == "NN" ||
        tag.substring(0,2) == "VB" ||
        tag.substring(0,2) == "JJ"){

          var localtest = true;
          for (var i = 0; i < Testing.length; i++){
            if (Testing[i].primary == sample_word){
              localtest = false;
              Testing[i].mentions += 1;
              break;
            }
          }

          if(localtest){

            var synoms = synonyms(sample_word);

            var wordlist = [];

            if (synoms&& synoms.n ){wordlist = wordlist.concat(synoms.n);}
            if (synoms && synoms.v){wordlist = wordlist.concat(synoms.v);}
            if (synoms && synoms.s){wordlist = wordlist.concat(synoms.s);}
            if (synoms && synoms.r){wordlist = wordlist.concat(synoms.r);}

            var word = {
              primary: sample_word,
              secondary: wordlist,
              mentions: 1
            }

            Testing.push(word);
          }

        }
      }

    }

    var Target = (Corpus.split(" ")).length +0.0;
    var Score = 0.0;
    for (var x = 0; x < Answers.length; x++){
      Not_Found = true;
      for (var y = 0; y < Testing.length && Not_Found; y++){
        if ((Answers[x].primary).localeCompare(Testing[y].primary) == 0) {

          balance = Math.max(Testing[y].mentions / Answers[x].mentions,1);
          Score += Math.sqrt(balance) * Math.max(WEIGHT_OF_PRIMARY,
            SFP*Target);
            Not_Found = false;

          } else{
            for (var x1 = 0; x1 < Answers[x].length; x1++){
              if ((Answers[x].secondary[x1]).localeCompare(Testing[y].primary) == 0) {
                Score += WEIGHT_OF_SECONDARY;
                Not_Found = false;
                break;
              }
            }
          }

        }
      }


      return Math.min((Score/Target)*100, 100);

    },

    Face_Compare: async function (x, callback) {

      ClearCache(function(result1) {
        console.log("Cleared Local Ref");
        Update_Collection(function(result) {
          console.log("Populated Local Ref");
          Compare_Face(x,function(result2) {
            callback(result2);
          });
        });
      });


    }
  };

  async function ClearCache(callback){
    rek.deleteCollection({CollectionId: collectionName}, function(err, data) {
      rek.createCollection({CollectionId: collectionName}, function(err, data) {
        if (err){
          console.log(err, err.stack);
          return false;
        } else {
          console.log("Made Collection: "+ collectionName);
          callback(true);
        }
      });
    });
  }

  async function Update_Collection(callback){
    s3.listObjects({Bucket: "facecompare12", MaxKeys: 100}, function(err, data) {
      if (err){
        console.log(err, err.stack);
        return false;
      }else{
        for (var i = 0; i < (data.Contents).length; i ++){
          var locparams = {
            CollectionId: collectionName,
            ExternalImageId: (data.Contents)[i].Key,
            Image: {
              S3Object: {
                Bucket: "facecompare12",
                Name: data.Contents[i].Key
              }
            },
          }
          rek.indexFaces(locparams, function(err, img) {
            if (err){
              console.log(err, err.stack);
              return false;
            }
            else{
              callback(true);
            }
          });
        }
      }
    });
  }

  async function Compare_Face (face, callback){
    var params = {
      CollectionId: collectionName,
      Image: {
        S3Object: {
          Bucket: "facecompare12",
          Name: face
        }
      },
      FaceMatchThreshold: 0,
      MaxFaces: 1,
    };
    rek.searchFacesByImage(params, function(err, data) {
      if (err){
        console.log(err, err.stack);
      }

      else{
          callback(data.FaceMatches)
      }
    });
  }

  async function PrintCollection(){
    var params = {
      CollectionId: collectionName,
      MaxResults: 90
    };
    rek.listFaces(params, function(err, data) {
      if (err) console.log(err, err.stack);
      else     console.log(data);
    })
  }
