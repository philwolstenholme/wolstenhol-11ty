exports.handler = async function (event, context) {
  const { identity, user } = context.clientContext;

  return {
    statusCode: 200,
    body: JSON.stringify({
      identity: JSON.stringify(identity),
      user: JSON.stringify(user),
      title: event.queryStringParameters.title,
      url: event.queryStringParameters.url,
    }),
  };
};
