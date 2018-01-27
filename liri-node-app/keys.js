console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET 
};


// exports.twitterKeys = {
//   consumer_key: 'S24Lkk3SyBMEBj1RnX0O3zddS',
//   consumer_secret: 'Jrs2XYzTuNayFZlRjQj4pPpSWLuKp97ScHOzXQwE4jwUSKTVXZ',
//   access_token_key: '953821287335505922-cDRXOosBgDA9iTjocTJ37vhbfxSfLe3',
//   access_token_secret: 'YGYtdO3KyTs4qUK2GiK7V3r3M5bKNYbo1IfE7VnfA9vMX'
// };

// exports.spotifyKeys = {
// 	  id: '9558bc630b774573bde551b1b925f277',
//   secret: '6868b9c5022e4787bfc08f826bf6bcdc'
// };
