var pos = require('pos');
var natural = require('natural');
var synonyms = require("synonyms");

const WEIGHT_OF_PRIMARY = 3;
const WEIGHT_OF_SECONDARY = 1;

module.exports = {

  // Compare_To_User (FirebaseUser, Image, Text) Given a firebase
  //   reference will return the relative confidence score of that
  //   user being the actual user.

  Text_Closeness: async function (Text) {

    if (Text){
      var words = new pos.Lexer().lex(Text);
      var tagger = new pos.Tagger();
      var taggedWords = tagger.tag(words);

      var Testing= [];

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

      console.log(Testing);
    }
  },
  bar: async function () {
    return 2;
  }
};
