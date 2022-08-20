const { ApolloServer, gql } = require('apollo-server');
//3:g~~@EkB*u9Tmy
// heroku config:set NODE_ENV=development
const typeDefs = gql`
 
  type Book {
    title: String!
    author: String
  }

 
  type Query {
    books: [Book]
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Vicky',
  },
    {
      title: 'The Awakening',
      author: 'Kate Chopin',
    },
    {
      title: 'City of Glass',
      author: 'Paul Auster',
    },
  ];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      books: () => books,
    },
  };
  const {
    ApolloServerPluginLandingPageLocalDefault
  } = require('apollo-server-core');
  
  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
   // introspection: process.env.NODE_ENV !== 'production',
    plugins: [
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
  });
  
  // The `listen` method launches a web server.
 // server.listen().then(({ url }) => {
 //   console.log(`🚀  Server ready at ${url}`);
  //});

  server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`
      🚀  Server is ready at ${url}
      📭  Query at https://studio.apollographql.com/dev,
      
    `);
   // console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });
  