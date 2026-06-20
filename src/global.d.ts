declare module '*.css';

export {};

declare global {
  interface Window {
    dataLayer?: Array<any>;
    gtag?: (...args: any[]) => void;
  }
}
