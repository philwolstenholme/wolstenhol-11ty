exports.handler = async function (event, context) {
  const { user } = context.clientContext;
  const { title, url } = event.queryStringParameters;
  const itsMe = user.email === 'philgw@gmail.com';

  if (itsMe) {
    console.log(`Submitting ${title} (${url})`);
  } else {
    console.log(`It wasn't me…`);
  }

  return {
    statusCode: itsMe ? 200 : 403,
    body: JSON.stringify({
      identity: JSON.stringify(identity),
      user: JSON.stringify(user),
      title,
      url,
    }),
  };
};
