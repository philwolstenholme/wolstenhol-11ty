export default () => {
  const cssNakedDate = 9;
  const now = new Date();
  let start = new Date(now.getFullYear(), 3, cssNakedDate);
  let end = new Date(now.getFullYear(), 3, cssNakedDate);
  // Spread the event across the world by adding 12 hours before and after the 9th in local time.
  start.setTime(start.getTime() - 12 * 60 * 60 * 1000);
  end.setTime(end.getTime() + 36 * 60 * 60 * 1000);

  const params = new URLSearchParams(window.location.search);
  if (now > start && now < end && params.get('cssnd') !== '0') {
    document.querySelectorAll(`link[rel~="stylesheet"],style`).forEach(link => link.remove());
    document.querySelectorAll(`[class]`).forEach(el => el.removeAttribute('class'));
    const message = document.createElement('div');
    const body = document.getElementsByTagName('body')[0];
    message.innerHTML = `
          <p>Why is this page looking so simple? It\'s <a href="https://css-naked-day.github.io">CSS Naked Day</a>! If you really want, you can <a href="/?cssnd=0">bring back the CSS</a>.</p>
          <p>Removing the <abbr title="Cascading Style Sheets">CSS</abbr> of a website can reveal how well semantic HTML has been used. My markup isn't perfect, I'd like to make just the headings in my card components a link, rather than using a link that wraps the whole card. This will help avoid <a href="https://inclusive-components.design/cards/#:~:text=This%20is%20not%20without%20its%20problems.%20Now%2C%20all%20of%20the%20card%20contents%20form%20the%20label%20of%20the%20link.%20So%20when%20a%20screen%20reader%20encounters%20it%2C%20the%20announcement%20might%20be%20something%20link%20%22Card%20design%20woes%2C%20ten%20common%20pitfalls%20to%20avoid%20when%20designing%20card%20components%2C%20by%20Heydon%20Pickering%2C%20link%22.">issues for assistive tech users</a>.</p>
          <hr>
        `;
    body.insertBefore(message, body.firstChild);
  }
};
