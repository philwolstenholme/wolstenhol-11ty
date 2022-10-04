let interval;

export function rotateTitle(text = document.title, separator = `-`, speed = 300, prefix) {
  // MarqueeTitle v4.0 | MIT License | git.io/vQZbs
  let title = text + ' ' + separator + ' ';
  interval = setInterval(() => {
    title = prefix + title.replace(prefix, '').substring(1) + title.replace(prefix, '').charAt(0);
    window.requestAnimationFrame(() => {
      document.title = title;
    });
  }, speed);
}

export function stopRotatingTitle() {
  clearInterval(interval);
}
