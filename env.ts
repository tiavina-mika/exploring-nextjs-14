import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

const env = createEnv({
  /*
   * Serverside Environment variables, not available on the client.
   * Will throw if you access these variables on the client.
   */
  server: {
    SERVER: z.string().min(1),
    NODE_ENV: z.enum(['development', 'test', 'production']),
    PARSE_APP_ID: z.string(),
    SERVER_URL: z.string().url(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
  },
  /*
   * Environment variables available on the client (and server).
   *
   * 💡 You'll get type errors if these are not prefixed with NEXT_PUBLIC_.
   */
  client: {
    NEXT_PUBLIC_CLIENT: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    // -------- server -------- //
    SERVER: process.env.SERVER,
    NODE_ENV: process.env.NODE_ENV,
    PARSE_APP_ID: process.env.PARSE_APP_ID,
    SERVER_URL: process.env.SERVER_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    // -------- client -------- //
    NEXT_PUBLIC_CLIENT: process.env.NEXT_PUBLIC_CLIENT,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
});

export default env;
