declare namespace NodeJS {
  export interface ProcessEnv {
    SESSION_NAME: string;
    SESSION_SECRET: string;
    NODE_ENV: string;
    GITHUB_CLIENT_ID: string;
  }
}
