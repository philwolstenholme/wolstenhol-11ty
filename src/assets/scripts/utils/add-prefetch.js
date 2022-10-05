export default function addPrefetch(url) {
  if (navigator.connection && navigator.connection.effectiveType === '4g') {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  }
}
