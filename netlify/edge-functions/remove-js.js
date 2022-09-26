import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

class HeadHandler {
  constructor(data) {
    this.urlToTransform = data.urlToTransform;
  }

  element(element) {
    element.prepend(`<base href="${this.urlToTransform}" />`, { html: true });
  }
}

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

class AnchorRewriter {
  constructor(data) {
    this.noJsUrl = data.noJsUrl;
  }

  element(element) {
    if (element.hasAttribute('href') && element.getAttribute('href') === 'no-js') {
      // Prevent the no-JS page from linking to itself.
      element.setAttribute('href', '../no-js');
    }

    if (element.hasAttribute('href') && element.getAttribute('href').startsWith('#')) {
      // Prevent in-page fragment anchors from reloading the page due to the <base> tag.
      element.setAttribute('href', `${this.noJsUrl}${element.getAttribute('href')}`);
    }
  }
}

export default async (request, context) => {
  const url = new URL(request.url);

  if (!url.pathname.endsWith('/no-js')) {
    return;
  }

  const urlToTransform = request.url.replace('/no-js', '');
  context.log('Rustling up a no-JS version of', urlToTransform);

  const response = await fetch(urlToTransform);

  const transformedResponse = new HTMLRewriter()
    .on('head', new HeadHandler({ urlToTransform }))
    .on('script', new ScriptRemover())
    .on('noscript', new NoScriptContentUnwrapper())
    .on('title', new TitleRewriter())
    .on('*', new JSAttributeRemover())
    .on('a', new AnchorRewriter({ noJsUrl: request.url }))
    .transform(response);

  transformedResponse.headers.set('X-Robots-Tag', 'noindex');
  transformedResponse.headers.set('Link', `<${urlToTransform}>; rel="canonical"`);

  return transformedResponse;
};
