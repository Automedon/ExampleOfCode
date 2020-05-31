import { createTestClient } from "apollo-server-testing";
import { ApolloServer, gql } from "apollo-server";
import { FIND_USER_QUERY } from "../../graphql/query";
import { typeDefs } from "../../server/typeDefs";
import { resolvers } from "../../server/resolvers";

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen("9996").then(({ url }: any) => {
  console.log(`🚀 Server ready at ${url}`);
});
describe("ApolloQueries", () => {
  it("FIND_USER_QUERY without userid", async () => {
    const { query } = createTestClient(server);
    const res = await query({ query: FIND_USER_QUERY });
    expect(res.errors?.length).toBeGreaterThan(0);
    expect(res.data?.findUser).toStrictEqual(null);
  });
});

server.stop();
