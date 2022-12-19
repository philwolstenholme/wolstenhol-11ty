const fetch = require('node-fetch');

const handler = async function (event) {
  const errorResponse = {
    statusCode: 500,
    body: `The redirect failed. Try looking me up on a search engine or messaging me instead.`,
  };

  try {
    const response = await fetch('https://wolstenhol.me/.well-known/webfinger?resource=acct:phil@wolstenhol.me', {
      headers: { Accept: 'application/jrd+json' },
    });

    if (!response.ok) {
      console.error({
        statusCode: response.status,
        body: response.statusText,
      });

      return errorResponse;
    }

    const data = await response.json();

    const profilePageLink = data.links.find(
      link => link.rel === 'http://webfinger.net/rel/profile-page' && !link.href.includes('wolstenhol.me')
    );

    return {
      statusCode: 302,
      headers: {
        Location: profilePageLink.href,
      },
    };
  } catch (error) {
    console.error(error);
    return errorResponse;
  }
};

module.exports = { handler };
