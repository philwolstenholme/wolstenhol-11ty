import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { rotateTitle, stopRotatingTitle } from './scrolling-title.js';

describe('scrollingTitle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => cb());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('rotates the title', () => {
    document.title = 'Example';
    rotateTitle('Hello World');

    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('ello World - H');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('llo World - He');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('lo World - Hel');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('o World - Hell');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual(' World - Hello');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('World - Hello ');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('orld - Hello W');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('rld - Hello Wo');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('ld - Hello Wor');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('d - Hello Worl');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual(' - Hello World');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('- Hello World ');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual(' Hello World -');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('Hello World - ');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('ello World - H');
  });

  it('can stop rotating the title', () => {
    stopRotatingTitle();
    document.title = 'Example';
    rotateTitle('Hello World');
    vi.advanceTimersToNextTimer();
    expect(document.title).toEqual('ello World - H');
    stopRotatingTitle();
    vi.advanceTimersByTime(1000);
    expect(document.title).toEqual('ello World - H');
  });
});
