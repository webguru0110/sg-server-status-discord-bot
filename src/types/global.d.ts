export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TOKEN: string;
      APPLICATION_ID: string;
      MONGO_URI: string;
    }
  }
}
