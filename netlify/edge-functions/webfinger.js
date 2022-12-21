import { Status } from 'https://deno.land/std@0.136.0/http/http_status.ts';

export default async (request, context) => {
  const url = new URL(request.url);
  const resourceParam = url.searchParams.get('resource');

  const host = Deno.env.get('MASTODON_INSTANCE');
  const accountOnHost = Deno.env.get('MASTONDON_USER_NAME') + '@' + Deno.env.get('MASTODON_INSTANCE');

  if (resourceParam === null) {
    return context.json(
      {
        error: "No 'resource' query parameter was provided",
      },
      {
        status: Status.BadRequest,
      }
    );
  }

  if (resourceParam !== 'acct:phil@wolstenhol.me') {
    return context.json(
      {
        error: 'An invalid identity was requested',
      },
      {
        status: Status.BadRequest,
      }
    );
  }

  const webfingerResponse = await fetch(host + '/.well-known/webfinger?resource=acct:' + accountOnHost);
  const json = await webfingerResponse.json();

  json.links.push({
    rel: 'http://webfinger.net/rel/profile-page',
    type: 'text/html',
    href: 'https://wolstenhol.me',
  });

  json.aliases.push('https://wolstenhol.me');

  return new Response(JSON.stringify(json), webfingerResponse);
};
