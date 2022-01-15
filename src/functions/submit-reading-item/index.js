const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const { title, url } = event.queryStringParameters;

  console.log({ user, title, url });
  console.log(process.env.AIRTABLE_KEY);

  if (!user) {
    console.error('No authentication details!');
    return {
      statusCode: 403,
      body: '',
    };
  }

  const itsMe = user.email === 'philgw@gmail.com';

  if (itsMe) {
    fetch('https://api.airtable.com/v0/appT2NMQ7UD8T2smq/List', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.AIRTABLE_KEY}`,
      },
      body: JSON.stringify({
        records: [
          {
            fields: {
              url,
              title,
            },
          },
        ],
      }),
    })
      .then(response => {
        return response.json();
      })
      .then(() => {
        console.log(`Submitted ${title} (${url})`);
      });
  } else {
    console.log(`It wasn't me…`);
  }

  return {
    statusCode: itsMe ? 200 : 403,
    body: JSON.stringify({
      title,
      url,
    }),
  };
};
