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

  // Add boring sounding genres here to exclude them.
  const genresPickedSoFar = ['modern alternative rock', 'modern rock', 'alternative rock'];

  const pickAGenreNotUsedSoFar = (artistGenresWithLongestFirst, genresPickedSoFar, index) => {
    const hasBeenUsed = genresPickedSoFar.includes(artistGenresWithLongestFirst[index]);

    if (!hasBeenUsed) {
      const genre = artistGenresWithLongestFirst[index];
      genresPickedSoFar.push(genre);
      return genre;
    } else {
      if (index + 1 < artistGenresWithLongestFirst.length) {
        return pickAGenreNotUsedSoFar(artistGenresWithLongestFirst, genresPickedSoFar, index + 1);
      } else {
        return;
      }
    }
  };

  let artistGenres = _.mapValues(artists, function (artist) {
    // We want the most ridiculous Spotify genres, so let's favour the longest ones.
    const artistGenresWithLongestFirst = artist.genres.sort((a, b) => String(b).length - String(a).length);
    const genre = pickAGenreNotUsedSoFar(artistGenresWithLongestFirst, genresPickedSoFar, 0);

    if (genre) {
      return {
        artist: artist.name,
        genre: genre,
      };
    }
  });

  artistGenres = _.filter(artistGenres, function (entry) {
    return entry?.genre?.length > 4;
  });

  randomGenres = _.sampleSize(artistGenres, 6);
  randomGenres = _.compact(randomGenres);

  await Promise.all(spotifyFeaturesPromises);

  console.table({ 'Artists: ': Object.keys(artists).length, 'Genres: ': randomGenres.length });

  return { artists, randomGenres };
};
