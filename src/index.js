/* @flow */
/* eslint-disable no-unused-vars */

import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import { apolloUploadExpress } from 'apollo-upload-server';
import { schema } from './schema';

const PORT = 4000;
const app = express();

app.use(
  '/graphql',
  bodyParser.json(),
  apolloUploadExpress(/* Options */),
  graphqlHTTP(async (request, response, graphQLParams) => {
    return {
      schema,
      graphiql: true,
      context: {
        req: request,
      },
    };
  })
);

app.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}/graphql`);
});
