import { rest } from 'msw';

const pageParams = new URLSearchParams(window.location.search);

const getISOTime = (timeAgo = 10) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() - timeAgo);
  return now.toISOString();
};

const handlers = [
  rest.get('https://wolstenhol.me/api/recently-played-spotify', (req, res, ctx) => {
    const status = pageParams.get('recently-played-spotify--status');
    const timeAgo = pageParams.get('recently-played-spotify--timeago');
    const name = pageParams.get('recently-played-spotify--name');

    if (status === 'error') {
      return res(ctx.status(500));
    }

    if (status === 'empty') {
      return res(ctx.status(200), ctx.json({}));
    }

    // Default status is the happy path:
    return res(
      ctx.status(200),
      ctx.json({
        playedAt: getISOTime(timeAgo),
        name: name || 'religion (u can lay your hands on me)',
        artistList: 'Shura',
        trackUrl: 'https://open.spotify.com/track/4YIimRZi9KYx0ohj1b7vmj',
      })
    );
  }),
];

export default handlers;
