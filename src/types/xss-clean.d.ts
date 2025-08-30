declare module 'xss-clean' {
  import { RequestHandler } from 'express';
  const factory: () => RequestHandler;
  export default factory;
}
