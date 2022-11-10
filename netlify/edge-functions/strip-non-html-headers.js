export default async (request, context) => {
  const response = await context.next();

  const contentType = response.headers.get('content-type');
  if (!contentType || contentType.startsWith('text/html')) {
    return response;
  }

  const htmlOnlyHeaders = [
    'x-frame-options',
    // https://webhint.io/docs/user-guide/hints/hint-no-html-only-headers
    'content-security-policy',
    'x-content-security-policy',
    'x-ua-compatible',
    'x-webkit-csp',
    'x-xss-protection',
    // https://gist.github.com/simonhearne/2715250eaccb911ebfff9e2315b2ffee
    'content-security-policy-report-only',
    'feature-policy',
    'nel',
    'report-to',
    'accept-ch',
    'referrer-policy',
    'strict-transport-security',
    'link',
  ];

  response.headers.forEach((value, key, object) => {
    if (contentType.startsWith('text/javascript') && (key === 'content-security-policy' || key === 'x-content-security-policy')) {
      // In case of a JavaScript file, Content-Security-Policy and X-Content-Security-Policy
      // can be ignored since CSP is also relevant to workers.
      return;
    }

    if (htmlOnlyHeaders.includes(key)) {
      object.delete(key);
    }
  });

  return response;
};
