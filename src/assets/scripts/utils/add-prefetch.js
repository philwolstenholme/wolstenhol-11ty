export default function addPrefetch(url, as) {
  if (navigator.connection && navigator.connection.effectiveType === '4g') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;

    if (as) {
      link.as = as;
    }

    document.head.appendChild(link);
  }
}
