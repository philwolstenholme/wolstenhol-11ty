import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter@v0.1.0-pre.17/index.ts';

class ScriptRemover {
  element(element) {
    element.remove();
  }
}

class JSAttributeRemover {
  element(element) {
    const globalEventHandlers = [
      'onabort',
      'onanimationcancel',
      'onanimationend',
      'onanimationiteration',
      'onauxclick',
      'onblur',
      'oncancel',
      'oncanplay',
      'oncanplaythrough',
      'onchange',
      'onclick',
      'onclose',
      'oncontextmenu',
      'oncuechange',
      'ondblclick',
      'ondrag',
      'ondragend',
      'ondragenter',
      'ondragexit',
      'ondragleave',
      'ondragover',
      'ondragstart',
      'ondrop',
      'ondurationchange',
      'onemptied',
      'onended',
      'onerror',
      'onfocus',
      'ongotpointercapture',
      'oninput',
      'oninvalid',
      'onkeydown',
      'onkeypress',
      'onkeyup',
      'onload',
      'onloadeddata',
      'onloadedmetadata',
      'onloadstart',
      'onlostpointercapture',
      'onmousedown',
      'onmouseenter',
      'onmouseleave',
      'onmousemove',
      'onmouseout',
      'onmouseover',
      'onmouseup',
      'onpause',
      'onplay',
      'onplaying',
      'onpointercancel',
      'onpointerdown',
      'onpointerenter',
      'onpointerleave',
      'onpointermove',
      'onpointerout',
      'onpointerover',
      'onpointerup',
      'onprogress',
      'onratechange',
      'onreset',
      'onresize',
      'onscroll',
      'onsecuritypolicyviolation',
      'onseeked',
      'onseeking',
      'onselect',
      'onselectionchange',
      'onselectstart',
      'onstalled',
      'onsubmit',
      'onsuspend',
      'ontimeupdate',
      'ontoggle',
      'ontouchcancel',
      'ontouchend',
      'ontouchmove',
      'ontouchstart',
      'ontransitioncancel',
      'ontransitionend',
      'onvolumechange',
      'onwaiting',
      'onwheel',
    ];

    const attributesToRemove = [...globalEventHandlers];

    attributesToRemove.forEach(attribute => {
      if (element.hasAttribute(attribute)) {
        element.removeAttribute(attribute);
      }
    });
  }
}

class NoScriptContentUnwrapper {
  element(element) {
    element.removeAndKeepContent();
  }
}

class TitleRewriter {
  element(element) {
    element.prepend('[JS automatically removed] ');
  }
}

export default async (request, context) => {
  const response = await context.next();
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.startsWith('text/html')) {
    return response;
  }

  const url = new URL(request.url);
  if (!url.searchParams.has('no-js')) {
    return response;
  }

  context.log('Rustling up a no-JS version of', request.url);

  const transformedResponse = new HTMLRewriter()
    .on('script', new ScriptRemover())
    .on('noscript', new NoScriptContentUnwrapper())
    .on('title', new TitleRewriter())
    .on('*', new JSAttributeRemover())
    .transform(response);

  transformedResponse.headers.set('X-Robots-Tag', 'noindex');
  transformedResponse.headers.set('Link', `<${url.href.replace(url.search, '')}>; rel="canonical"`);

  return transformedResponse;
};
