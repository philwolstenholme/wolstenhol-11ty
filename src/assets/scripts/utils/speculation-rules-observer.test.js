import { afterEach, describe, expect, test, vi } from 'vitest';
import { addSpeculationRule } from './speculation-rules-observer';

describe('addSpeculationRule', () => {
  const setUpSpys = () => {
    HTMLScriptElement.supports = () => true;

    const scriptElement = document.createElement('script');

    vi.spyOn(document, 'createElement').mockImplementation(() => scriptElement);
    vi.spyOn(document.body, 'append');

    return { scriptElement };
  };

  afterEach(() => {
    vi.restoreAllMocks();
    delete HTMLScriptElement.supports;
  });

  test('adds a rule for a single URL', () => {
    const { scriptElement } = setUpSpys();
    const urls = 'https://example.com/';

    addSpeculationRule(urls);

    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(document.body.append).toHaveBeenCalledWith(scriptElement);
    expect(scriptElement.type).toEqual('speculationrules');
    expect(scriptElement.textContent).toEqual('{"prerender":[{"source":"list","urls":["https://example.com/"]}]}');
  });

  test('adds a rule for multiple URLs', () => {
    const { scriptElement } = setUpSpys();
    const urls = ['https://example.com/', 'https://example.com/foo'];

    addSpeculationRule(urls);

    expect(document.createElement).toHaveBeenCalledWith('script');
    expect(document.body.append).toHaveBeenCalledWith(scriptElement);
    expect(scriptElement.type).toEqual('speculationrules');
    expect(scriptElement.textContent).toEqual(
      '{"prerender":[{"source":"list","urls":["https://example.com/","https://example.com/foo"]}]}'
    );
  });
});
