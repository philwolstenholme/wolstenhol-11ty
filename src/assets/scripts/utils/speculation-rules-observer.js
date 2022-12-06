function supportsSpeculationRules() {
  return HTMLScriptElement.supports && HTMLScriptElement.supports('speculationrules');
}

export function addSpeculationRule(urls) {
  if (supportsSpeculationRules()) {
    const specScript = document.createElement('script');
    specScript.type = 'speculationrules';
    const specRules = {
      prerender: [
        {
          source: 'list',
          urls: typeof urls === 'string' ? [urls] : urls,
        },
      ],
    };
    specScript.textContent = JSON.stringify(specRules);
    document.body.append(specScript);
  }
}

if (supportsSpeculationRules()) {
  const observer = new MutationObserver(mutations => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(node => {
          if (node.rel === 'prefetch') {
            addSpeculationRule(node.href);
            node.remove();
          }
        });
      }
    });
  });

  observer.observe(document, {
    childList: true,
    subtree: true,
  });
}
