import { describe, expect, test, vi, afterEach } from 'vitest';
import addPrefetch from './add-prefetch.js';

describe('addPrefetch', () => {
  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('network specific behaviour', () => {
    const setUpSpys = () => {
      const linkElement = document.createElement('link');

      vi.spyOn(document, 'createElement').mockImplementation(() => linkElement);
      vi.spyOn(document.head, 'appendChild');

      return { linkElement };
    };

    test('prefetches when connection is 4g', () => {
      navigator.connection = { effectiveType: '4g' };

      const { linkElement } = setUpSpys();
      addPrefetch('http://example.com');

      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(document.head.appendChild).toHaveBeenCalledWith(linkElement);
      expect(linkElement.href).toEqual('http://example.com');
      expect(linkElement.rel).toEqual('prefetch');
    });

    test('does not prefetch when connection is not 4g', () => {
      navigator.connection = { effectiveType: '3g' };

      const { linkElement } = setUpSpys();
      addPrefetch('http://example.com');

      expect(document.createElement).not.toHaveBeenCalledWith('link');
      expect(document.head.appendChild).not.toHaveBeenCalledWith(linkElement);
    });
  });
});
