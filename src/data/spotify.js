const SpotifyWebApi = require('spotify-web-api-node');
var _ = require('lodash');

module.exports = async function () {
  var credentials = {
    clientId: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  };

  const spotifyApi = new SpotifyWebApi(credentials);

  spotifyApi.setRefreshToken(process.env.SPOTIFY_REFRESH_TOKEN);

  // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
  await spotifyApi.refreshAccessToken().then(
    function (data) {
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
      console.error('Could not refresh access token', err.message);
    }
  );

  const artists = {};

  const topArtists = await spotifyApi
    .getMyTopArtists({
      time_range: 'short_term',
      limit: 14,
    })
    .then(
      function (data) {
        return data.body.items;
      },
      function (err) {
        console.error('Something went wrong!', err.message);
      }
    );

  _.forEach(topArtists, function (artist) {
    artists[artist.name] = artist;
  });

  let spotifyTopTrackPromises = [];
  _.forEach(artists, artist => {
    spotifyTopTrackPromises.push(
      spotifyApi.getArtistTopTracks(artist.id, 'GB').then(
        function (data) {
          artists[artist.name]['top_tracks'] = data.body.tracks[0];
        },
        function (err) {
          console.log('Something went wrong!', err.message);
        }
      )
    );
  });

  await Promise.all(spotifyTopTrackPromises);

  let spotifyFeaturesPromises = [];

  _.forEach(artists, artist => {
    spotifyFeaturesPromises.push(
      spotifyApi.getAudioFeaturesForTrack(artists[artist.name]['top_tracks']['id']).then(
        function (data) {
          artists[artist.name]['top_tracks']['features'] = data.body;
        },
        function (err) {
          console.error('Something went wrong!', err.message);
        }
      )
    );
  });

  let artistGenres = _.mapValues(artists, function (artist) {
    const genre = _.sample(artist.genres);

    if (genre) {
      return {
        artist: artist.name,
        genre: genre,
      };
    }
  });

  randomGenres = _.sampleSize(artistGenres, 5);
  randomGenres = _.compact(randomGenres);

  await Promise.all(spotifyFeaturesPromises);

  return { artists, randomGenres };
};
