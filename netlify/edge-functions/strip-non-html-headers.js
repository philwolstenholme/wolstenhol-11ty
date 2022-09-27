export default async (request, context) => {
  const response = await context.next();

  const contentType = response.headers.get('content-type');

  if (!contentType || contentType.startsWith('text/html')) {
    return response;
  }

  const htmlOnlyHeaders = [
    'content-security-policy',
    'x-content-security-policy',
    'x-ua-compatible',
    'x-webkit-csp',
    'x-xss-protection',
    'x-frame-options',
    // https://webhint.io/docs/user-guide/hints/hint-no-html-only-headers
  ];

  response.headers.forEach((value, key, object) => {
    if (contentType.startsWith('text/javascript') && (key === 'content-security-policy' || key === 'x-content-security-policy')) {
      // In case of a JavaScript file, Content-Security-Policy and X-Content-Security-Policy
      // can be ignored since CSP is also relevant to workers.
      context.log(`Ignoring as a JS file`);
      return;
    }

    if (htmlOnlyHeaders.includes(key)) {
      object.delete(key);
    }
  });

  return response;
};
