// / DotEnv
require('dotenv').config();

// linking keys.js file
var keys = require("./keys.js");
// command for reading and writing files
var fs = require("fs");

// requesting NPM packages
//  Twitter
var Twitter = require('twitter');
//  OMDB API
var request = require('request');
//  Spotify
var Spotify = require('node-spotify-api');
// Inquirer to ask user
var inquirer = require('inquirer');



//Creates an object to authenacaite Twitter queries
var accountTweets = new Twitter(keys.twitter);
//Limmit to 20 Tweets
// var limitTweets = 20;

//Creates an object to auth Spotify queries
var spotifyInfo = new Spotify(keys.spotify);

//Global Variables
var defaultSong = "The Sign";
var defaultMovie = "Mr. Nobody";

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  case "my-tweets":
    myTweets();
    break;
  case "spotify-this-song":
    mySpotify();
    break;
  case "movie-this":
    myMovie();
    break;
  case "do-what-it-says":
    random();
    break;
  default: // Adds user instructions to re-select an available action
  console.log("Please select an action request listed below:");
  console.log("my-tweets, spotify-this-song, movie-this, do-what-it-says");
    break;
}


// ----------------Twitter API--------------------------- 
function myTweets() {
 
var params = {screen_name: 'Ms Molly Ogolly', count: 20};
accountTweets.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (error) {
    console.log(error);
  } else if (!error) {
    // console.log(tweets);
    console.log("\nThese are your last " + (tweets.length) + " tweets: \n");
    for(var i = 0; i < tweets.length; i ++) {
      console.log(tweets[i].text);
      console.log("Tweets " + (i+1) + ": " + "\n" + tweets[i].text + 
          "\n" + "Created on: " + tweets[i].created_at);
        console.log("--------------------"); 
      
    }
    
  }
  });
}; 

// -------------------Spotify API-------------------------------------

function mySpotify() {
if(value === undefined) {
  value = defaultSong;
}
console.log(value)
  spotifyInfo.search({ type: 'track', query: value, limit: '1'}, function(err, data) {
    if (err) {
      console.log('Error occured: ' + err);
    } else {
      console.log(data)
      console.log("\nArtist: " + JSON.stringify(data.tracks.items[0].artists[0].name, null, 2) + "\n");
      console.log("Song Title: " + JSON.stringify(data.tracks.items[0].name) + "\n");
      console.log("Album " + JSON.stringify(data.tracks.items[0].album.name) + "\n");
      console.log("Link: " + JSON.stringify(data.tracks.itmes[0].album.external_urls));
    }
  });
};

// ----------------MOVIE DBM API---------------------------------------

function myMovie() {

// Take in the command line arguments
// var movie = process.argv;

// Create an empty string for holding the movie name
// var value = "";

// Capture all the words in the movie name (ignore first 3 node arguments
// for (var i = 3; i < movie.length; i++) {

// If TRUE, Build a string with the movie name.
// if (i > 3 && i < movie.length) {
//   value = value + "+" + movie[i];
// } else {
//   value += movie[i];
//  }
// }
console.log(value)
// Create URL query variable to store URL to request JSON from OMDB API
var queryUrl = "http://www.omdbapi.com/?apikey=40e9cece&t=" + value + "&tomatoes=true&y=&plot=short&r=json";

// Run request to OMDB API with URL varible
request(queryUrl, function(error, response, body) {
// If the request was unsuccessful ... 
  if (value === undefined) {
    value = defaultMovie;
  }

// If the request was successful ... 
  // else{

    var body = JSON.parse(body);

// Then log the body details from the OMDB API
      console.log("\nMovie Title: " + body.Title + "\n ");
      console.log("Year Released: " + body.Released + "\n ");
      console.log("Rating: " + body.Rated + "\n ");
      console.log("Production Country: " + body.Country + "\n ");
      console.log("Language: " + body.Language + "\n ");
      console.log("Plot: " + body.Plot + "\n ");
      console.log("Actors: " + body.Actors + "\n ");
      console.log("Rotten Tomatoes Rating: " + body.ratings + "\n "); //tomato rating not render
      console.log("Rotten Tomatoes URL: " + body.tomatoURL);
  // } 
  });
}


// --------------DO-WHAT-IT-SAYS----------------------------
// reads the data 
// passes it as a search value in the Spotify function

function random() {

  fs.readFile('./random.txt', 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    else {
      console.log(data);

//Converst data in text file into array
      var arr = data.split(",");
      value = arr[1];
// If command name at index[0] matches the string, invoke the function
        if(arr[0] == "movie-this") {
          myMovie(value);
        }
        else if (arr[0] == "spotify-this-song") {
          mySpotify(value);
        }
        else if (arr[0] == "my-tweets") {
          myTweets();
        }
    }
  });  
};































