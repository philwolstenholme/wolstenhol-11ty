import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter@v0.1.0-pre.17/index.ts';

export default async (request, context) => {
  const response = await context.next();

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.startsWith('text/html')) {
    return response;
  }

  const saveData = request.headers.get('Save-Data');
  if (!saveData || saveData !== 'on') {
    return response;
  }

  context.log('Rustling up a Save-Data version of', request.url);

  response.headers.set('Vary', 'Save-Data');

  const transformedResponse = new HTMLRewriter()
    .on('script', {
      element(element) {
        // Provide a way to avoid removing analytics snippets etc.
        if (!element.hasAttribute('data-keep-even-if-save-data')) {
          element.remove();
        }
      },
    })
    .on('noscript', {
      element(element) {
        // Unwrap any noscript elements to get some no-JS fallbacks.
        element.removeAndKeepContent();
      },
    })
    .on('*', {
      element(element) {
        if (element.hasAttribute('data-frivolous-grunge')) {
          element.remove();
        }
        if (element.hasAttribute('data-remove-if-save-data')) {
          element.remove();
        }
      },
    })
    .transform(response);

  return transformedResponse;
};
