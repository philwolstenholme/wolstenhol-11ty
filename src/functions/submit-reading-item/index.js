import wretch from 'wretch';
import fetch from 'node-fetch';

wretch.polyfills({
  fetch,
});

exports.handler = async function (event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 501,
      body: JSON.stringify({ message: 'Not Implemented' }),
      headers: { 'content-type': 'application/json' },
    };
  }

  const { user } = context.clientContext;

  const { title, url, skipTweet, commentary } = JSON.parse(event.body);

  if (!user) {
    console.error('No authentication details!');
    return {
      statusCode: 403,
      body: '',
    };
  }

  const itsMe = user.email === 'philgw@gmail.com';

  if (itsMe) {
    const body = {
      records: [
        {
          fields: {
            title,
            url,
            skipTweet,
            commentary,
          },
        },
      ],
    };

    console.log('going out: ', JSON.stringify(body, null, 2));

    const data = await wretch('https://api.airtable.com/v0/appT2NMQ7UD8T2smq/List')
      .auth(`Bearer ${process.env.AIRTABLE_KEY}`)
      .post(body)
      .json();

    console.log('coming back: ', JSON.stringify(data));

    // Trigger a build.
    await wretch(`https://api.netlify.com/build_hooks/${process.env.BUILD_HOOK_KEY}`).post();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } else {
    console.log(`It wasn't me…`);
  }

  return {
    statusCode: itsMe ? 500 : 403,
    body: JSON.stringify({
      title,
      url,
      skipTweet,
      commentary,
    }),
  };
};
