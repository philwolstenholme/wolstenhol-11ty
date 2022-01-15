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
  console.log(itsMe, user.email);

  if (itsMe) {
    console.log(`it's me`);

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
              title: title,
              url: url,
            },
          },
        ],
      }),
    })
      .then(response => {
        console.log(response.json());
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
