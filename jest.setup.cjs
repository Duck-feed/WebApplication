require("@testing-library/jest-dom");

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.window.ResizeObserver = ResizeObserverMock;

global.window.alert = jest.fn();
const { TextEncoder, TextDecoder } = require('util');
if (!global.TextEncoder) global.TextEncoder = TextEncoder;
if (!global.TextDecoder) global.TextDecoder = TextDecoder;
