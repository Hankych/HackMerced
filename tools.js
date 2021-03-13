var pos = require('pos');
var natural = require('natural');
var synonyms = require("synonyms");

module.exports = {

  // Compare_To_User (FirebaseUser, Image, Text) Given a firebase
  //   reference will return the relative confidence score of that
  //   user being the actual user.

  Text_Closeness: async function (Text) {

    console.log("AAA");
    if (Text){
      var words = new pos.Lexer().lex(Text);
      var tagger = new pos.Tagger();
      var taggedWords = tagger.tag(words);

      var Testing_Nouns = [];

      for (i in taggedWords) {
          var tag = taggedWords[i][1];

          var sample_word = taggedWords[i][0];

          if (tag == "NN" || tag == "NNP" ||
              tag == "NNPS" || tag == "NNS"){

            var synoms = synonyms(sample_word);
            if (!synoms || !synoms.n){
              synoms= {n: [""]};
            }

            var word = {
              primary: sample_word,
              secondary: synoms.n
            }
            Testing_Nouns.push(word);
          }
      }

      console.log(Testing_Nouns);
    }
  },
  bar: async function () {
    // whatever
  }
};
