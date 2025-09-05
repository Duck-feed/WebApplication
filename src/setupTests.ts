import '@testing-library/jest-dom';

// Mock ResizeObserver (HorizontalScroll dùng)
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

(window as any).ResizeObserver = ResizeObserverMock;

window.alert = jest.fn();
