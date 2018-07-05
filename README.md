# graphql-compose-boilerplate-upload

Add support for files upload in your graphql schema. Obtain any number of files in any resolvers at any field depth.
Will be good if you get acquainted with [graphql-multipart-request-spec](https://github.com/jaydenseric/graphql-multipart-request-spec)

Take a look at [commits](https://github.com/graphql-compose/graphql-compose-boilerplate-upload/commits/master) step by step, it will be easy to follow.

## Demo

Make proper `multipart/form-data` POST request with `operations` and `map` keys. And don't forget to provide files:

**Request via CURL**
```bash
curl localhost:4000/graphql \
  -F operations='{ "query": "mutation ($poster: Upload) { createPost(id: 5, poster: $poster) { id } }", "variables": { "poster": null } }' \
  -F map='{ "0": ["variables.poster"] }' \
  -F 0=@package.json
```

**Response from GraphQL server**
```bash
{"data":{"createPost":{"id":5}}}
```

**Request via POSTMAN**
<img width="728" alt="screen shot 2018-07-05 at 14 51 08" src="https://user-images.githubusercontent.com/1946920/42312868-2dfda7dc-8063-11e8-8a93-13f5b170913b.png">

**Resolver code**
```js
createPost: {
  type: 'Post',
  args: {
    id: 'Int!',
    title: 'String',
    authorId: 'Int',
    images: '[Upload]',
    poster: 'Upload',
  },
  resolve: async (_, { id, title, authorId, images, poster }) => {
    const newPost = { id, title, authorId };

    // somehow work with files
    if (poster) {
      console.log('Argument `poster` is a Promise:')
      console.log(poster);

      console.log("\nIt's value is and object with FileStream:");
      console.log(await poster);
    }

    // somehow save a new record
    posts.push(newPost);

    return newPost;
  },
},
```

**Console log on the server side**
```bash
Argument `poster` is a Promise:
Promise {
  { stream:
   FileStream {
     _readableState: [Object],
     readable: true,
     domain: null,
     _events: [Object],
     _eventsCount: 2,
     _maxListeners: undefined,

     truncated: false,
     _read: [Function] },
  filename: 'package.json',
  mimetype: 'application/octet-stream',
  encoding: '7bit' } }

It's value is and object with FileStream:
{ stream:
   FileStream {
     _readableState:
      ReadableState {
        objectMode: false,
        highWaterMark: 16384,
        buffer: [Object],
        length: 1983,
        pipes: null,
        pipesCount: 0,
        flowing: null,
        ended: true,
        endEmitted: false,
        reading: false,
        sync: false,
        needReadable: false,
        emittedReadable: true,
        readableListening: false,
        resumeScheduled: false,
        destroyed: false,
        defaultEncoding: 'utf8',
        awaitDrain: 0,
        readingMore: false,
        decoder: null,
        encoding: null },
     readable: true,
     domain: null,
     _events: { end: [Array], limit: [Object] },
     _eventsCount: 2,
     _maxListeners: undefined,
     truncated: false,
     _read: [Function] },
  filename: 'package.json',
  mimetype: 'application/octet-stream',
  encoding: '7bit' }
```

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
