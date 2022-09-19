import { HTMLRewriter } from 'https://ghuc.cc/worker-tools/html-rewriter/index.ts';

const getData = async () => {
  // A Netlify function can't call another Netlify function (I don't think)
  // So we use a Cloudflare Worker here:
  // const response = await fetch('https://wolstenhol.me/api/fake-edge-messages-endpoint');
  const response = await fetch('https://fake-edge-messages-endpoint.philgw.workers.dev');

  if (response.ok) {
    return response.json();
  } else {
    return null;
  }
};

class HeadHandler {
  constructor(data) {
    this.data = data;
    this.styles = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/open-props@1.4.14/colors.min.css" integrity="sha256-nDW4wv+K7EcSDxZYOOUw7fvUdkG5TYK3ZMX4tMwnYPo=" crossorigin="anonymous"><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/herald-of-the-dog@1.0.3/herald.css" integrity="sha256-zQLpc/AA/o1D8NgVLASianBlbMPs9i4carXMzf/L4mY=" crossorigin="anonymous"><style>announcement-banner { font-family: sans-serif; background: white; padding: 1em; display: flex; align-items: center; justify-content: space-between; } announcement-banner a { color: currentColor !important; } announcement-banner button { color: black; } announcement-banner[data-theme="sombre"] { background: var(--gray-9); color: var(--gray-0); font-family: "Georgia", serif; } announcement-banner[data-theme="emergency"] { background-color: var(--red-9); color: #fff; } announcement-banner[data-theme="celebratory"] { background: linear-gradient(135deg,#FCDF8A,#F38381); }</style>`;
    this.scripts = `<script src="https://cdn.jsdelivr.net/npm/herald-of-the-dog@1.0.3/herald.js" integrity="sha256-AcoJNZAkXVxpi/5ZW/CXeUadY0z5rEH7h/3OAs5HnTg=" crossorigin="anonymous"></script><script> let key = "${data.hash}"; let savedKey = localStorage.getItem("banner--cta-url"); if(savedKey === key) { document.documentElement.classList.add("banner--hide"); } </script>`;
  }

  element(element) {
    element.append(this.styles, { html: true }).append(this.scripts, { html: true });
  }
}

class BodyHandler {
  constructor(data) {
    this.data = data;
    this.bannerTemplate = `<announcement-banner data-banner-key="${data.hash}" data-theme="${data.theme}"> ${
      data.link ? `<a href="${data.link}">` : ''
    } ${data.text} ${data.link ? `</a>` : ''} <button type="button" data-banner-close>Close</button> </announcement-banner>`;
    // Excuse all the inline CSS, but this is a demo of edge stuff, not 'how to keep your CSS DRY'
    this.footerMessage = `<footer style=" position: absolute; bottom: 2em; left: 2em; background: rgb(4 4 4 / 80%); padding: 1.5em; max-width: 60ch; line-height: 1.8; color: white; ">This is the normal example.com but with a banner injected in by an edge worker. Refresh the page to try for a different example banner.</footer>`;
  }

  element(element) {
    element.prepend(this.bannerTemplate, { html: true }).append(this.footerMessage, { html: true });
  }
}

export default async (request, context) => {
  const data = await getData();
  // const response = await context.next();
  // In real-world usage the below line wouldn't be
  // necessary as we would work with the current request.
  // see: https://edge-functions-examples.netlify.app/example/transform
  const response = await fetch('https://example.com');

  if (!data || !data?.text) {
    return response;
  }

  const transformedResponse = new HTMLRewriter().on('head', new HeadHandler(data)).on('body', new BodyHandler(data)).transform(response);
  transformedResponse.headers.set('cache-control', 'no-store, must-revalidate');
  return transformedResponse;
};
