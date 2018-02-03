const SpotifyWebAPI = require('spotify-web-api-node');
const async = require('async');

/**
* Returns a list of recommended music based on an input artist.
* @param {string} artist
* @returns {Array}
*/
module.exports = (artist, context, callback) => {

  let spotifyAPI = new SpotifyWebAPI({
    clientId : process.env.CLIENT_ID,
    clientSecret : process.env.CLIENT_SECRET
  });

  spotifyAPI.clientCredentialsGrant({}, (err, data) => {

    if (err) {
      return callback(err);
    }

    // Save the access token so that it's used in future calls
    spotifyAPI.setAccessToken(data.body.access_token);

    spotifyAPI.searchArtists(artist, {
      limit: 1
    }, (err, results) => {

      if (err) {
        return callback(err);
      }

      let artists = results.body.artists.items;

      if (!artists.length) {
        return callback(new Error('No matching artist found'));
      }

      spotifyAPI.getArtistRelatedArtists(artists[0].id, (err, results) => {

        if (err) {
          return callback(err);
        }

        let artists = results.body.artists;

        if (!artists.length) {
          return callback(new Error('No matching artists found'));
        }

        artists = artists.sort(() => {
          return 0.5 - Math.random();
        }).slice(0, 5);

        async.parallel(artists.map((artist) => {

          return (cb) => {

            spotifyAPI.getArtistTopTracks(artist.id, 'US', (err, result) => {

              if (err) {
                return cb(err);
              }

              let tracks = result.body.tracks;

              return cb(null, tracks[Math.floor(Math.random() * tracks.length)]);

            });

          };

        }), (err, results) => {

          if (err) {
            return callback(err);
          }

          let tracks = results.map((track) => {
            return `${track.name} by ${track.artists[0].name}`
          });

          return callback(null, tracks);

        });

      });

    });

  });

};
