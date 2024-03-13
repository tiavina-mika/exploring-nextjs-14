const path = require('path');

const cors = require('cors');
const dotenv = require('dotenv');
const express = require('express');

const { ParseServer } = require('parse-server');

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const clientBuildPath = path.resolve(__dirname, '../clientBuild');
app.use(express.static(path.join(clientBuildPath)));
app.use(
  express.static(path.join(clientBuildPath), {
    lastModified: false,
    etag: false,
    //maxAge: '30 days',
    setHeaders: res => {
      // if (express.static.mime.lookup(path) === 'text/html') {
      // 	// Skip cache on html to load new builds.
      // 	res.setHeader('Cache-Control', 'public, max-age=0');
      // }
      res.setHeader('Cache-Control', 'no-cache');
    },
  }),
);

// eslint-disable-next-line turbo/no-undeclared-env-vars
const PORT = Number(process.env.PORT) || 1341;

// ====================== setting env path ====================== //
let envFileName = ".env.local";
let ENV = 'DEV';
const serverUrl = 'http://localhost:' + PORT;

const init = async () => {
  // load env var first
  await dotenv.config({ path: path.join(__dirname, '..', envFileName) });
  const DATABASE_URI = process.env.DATABASE_URI || 'mongodb://127.0.0.1:27017/next14';
  const MASTER_KEY = process.env.MASTER_KEY || 'local-master-key';

  // config parse server
  const parseServer = new ParseServer({
    databaseURI: DATABASE_URI,
    cloud: path.resolve(__dirname, './cloud/index'),
    appId: 'next14',
    serverURL: serverUrl + '/parse',
    publicServerURL: serverUrl + '/parse',
    masterKey: MASTER_KEY,
    allowClientClassCreation: true,
    allowExpiredAuthDataToken: true,
    encodeParseObjectInCloudFunction: true
  });

  // start the parse server
  await parseServer.start();

  // mount the parse server to express api
  app.use('/parse', parseServer.app);

  app.listen(PORT, () => {
    console.log(
      `
        =====================================
                    [${ENV}]
                  ${serverUrl}
        =====================================
        `,
    );
  });
};

init();
