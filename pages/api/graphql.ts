import { createServer } from "@graphql-yoga/node";
import { EventService } from "../service/eventService";
import { Event } from "./types";

const typeDefs = /* GraphQL */ `
  type Event {
    id: ID!
    title: String!
    start: Int!
    end: Int!
  }

  type Query {
    events: [Event!]!
  }
`;

const resolvers = {
  Query: {
    async events(parent, input, { eventService }) {
      return await eventService.readDataFromFile();
    },
  },
};

const server = createServer({
  schema: {
    typeDefs,
    resolvers,
  },
  endpoint: "/api/graphql",
  context: {
    eventService: new EventService<Event>("./pages/service/data.json"),
  },
});

export default server;
