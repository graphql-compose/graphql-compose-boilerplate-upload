# graphql-compose-boilerplate-upload

Add support for files upload in your graphql schema. Obtain any number of files in any resolvers at any field depth.
Will be good if you get acquainted with [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec)

## Includes for Files Upload
- [apollo-upload-server](https://github.com/jaydenseric/apollo-upload-server) for parsing `multipart/form-data` POST requests via [busboy](https://github.com/mscdex/busboy)

## Includes from basic graphql-compose-boilerplate

- Babel (ES6, babel-preset-env)
- ESLint
- Flowtype
- express
- express-graphql
- graphql
- graphql-compose
- nodemon

## Usage

```bash
git clone https://github.com/graphql-compose/graphql-compose-boilerplate-upload

cd graphql-compose-boilerplate

# make it to your own
rm -rf .git

yarn install

# start server with reloading on file changes
yarn dev

# OR start server
yarn start
```
