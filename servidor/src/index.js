import express from 'express';
import env from 'node-env-file'; // .env file
import setMiddleware from './middleware';
import { graphqlRouter } from './api/graphqlRouter';
import { connect } from './database';

const app = express();

env('./.env');

var port = process.env.PORT || '3000';

var cors = require("cors");

var corsOptions = {
    origin: "*",
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

connect();
setMiddleware(app);

const path = '/login'
graphqlRouter.applyMiddleware({ app, path });

app.listen(port, function () {
    console.log(`El servidor ha sido iniciado en: http://localhost:${port}`);
});

export default app;

