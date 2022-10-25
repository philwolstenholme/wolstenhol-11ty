const ric = (callback, timeout = 1000) => {
  if ('requestIdleCallback' in window) {
    return window.requestIdleCallback(callback, { timeout });
  }

  return setTimeout(callback, 200);
};

export default ric;
