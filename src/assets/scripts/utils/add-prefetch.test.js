import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import addPrefetch from './add-prefetch.js';

describe('addPrefetch', () => {
  const setUpSpys = () => {
    const linkElement = document.createElement('link');

    vi.spyOn(document, 'createElement').mockImplementation(() => linkElement);
    vi.spyOn(document.head, 'appendChild');

    return { linkElement };
  };

  afterEach(() => {
    vi.restoreAllMocks();
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

  describe('as attribute', () => {
    test('adds as attribute when provided', () => {
      navigator.connection = { effectiveType: '4g' };

      const { linkElement } = setUpSpys();
      addPrefetch('http://example.com', 'image');

      expect(linkElement.as).toEqual('image');
    });

    test('does not add as attribute when not provided', () => {
      navigator.connection = { effectiveType: '4g' };

      const { linkElement } = setUpSpys();
      addPrefetch('http://example.com');

      expect(linkElement.as).toEqual('');
    });
  });
});
