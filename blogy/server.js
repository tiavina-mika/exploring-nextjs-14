const next = require('next');
const express = require('express');
const cors = require('cors');
const Parse = require('parse/node');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 9001;
// when using middleware `hostname` and `port` must be provided below
const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

const serverUrl = 'http://localhost:1341';

nextApp
  .prepare()
  .then(() => {
    Parse.serverURL = serverUrl + '/parse';
    Parse.initialize(process.env.PARSE_APP_ID);
    Parse.masterKey = 'local-master-key';

    global.Parse = Parse;

    const app = express();

    app.use(cors());

    app.all('*', (req, res) => {
      return handle(req, res);
    });

    app.listen(port, () => {
      console.log(
        `
        =====================================
        NextJs server
        http://${hostname}:${port}
        =====================================
        `,
      );
    });
  })
  .catch((error) => {
    console.error(error.stack);
    process.exit(1);
  });
