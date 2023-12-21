import type { NextApiRequest, NextApiResponse } from 'next'
import ParseServer from 'parse-server';
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { NextResponse } from 'next/server';

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     // console.log(' --------- path ', path.join(__dirname  + '../cloud/main.ts'));

//     const server = new ParseServer({
//       databaseURI: 'mongodb://127.0.0.1:27017/next14-parse', // Connection string for your MongoDB database
//       cloud: './cloud/main.ts', // Path to your Cloud Code
//       appId: 'myAppId',
//       masterKey: 'myMasterKey', // Keep this key secret!
//       fileKey: 'optionalFileKey',
//       serverURL: 'http://localhost:9001/parse', // Don't forget to change to https if needed
//       allowClientClassCreation: true,
//       allowExpiredAuthDataToken: true,
//       encodeParseObjectInCloudFunction: true
//     });

//     // Start server
//     await server.start();
//     // console.log('server.app: ', server.app);
//     res.status(200).send(server.app)
//   } catch (err) {
//     res.status(500).send({ error: 'failed to fetch data' })
//   }
// }


const router = createRouter<NextApiRequest, NextApiResponse>();

const init = async () => {
      const server = new ParseServer({
      databaseURI: 'mongodb://127.0.0.1:27017/next14-parse', // Connection string for your MongoDB database
      cloud: './cloud/main.ts', // Path to your Cloud Code
      appId: 'myAppId',
      masterKey: 'myMasterKey', // Keep this key secret!
      fileKey: 'optionalFileKey',
      serverURL: 'http://localhost:9001/parse', // Don't forget to change to https if needed
      allowClientClassCreation: true,
      allowExpiredAuthDataToken: true,
      encodeParseObjectInCloudFunction: true
    });

    // Start server
    await server.start();

  router
  // Use express middleware in next-connect with expressWrapper function
  // A middleware example
  .use('/', server.app)
}

init();

export const config = {
  runtime: "edge",
};

export default router.handler({
  onError: (err, req, res) => {
    console.error(err.stack);
    res.status(err.statusCode || 500).end(err.message);
  },
});