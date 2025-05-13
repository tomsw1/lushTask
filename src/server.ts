import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { schema } from './schema'

async function startApolloServer() {
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server);
  console.log(`Server is running: ${url}`)
}

startApolloServer();