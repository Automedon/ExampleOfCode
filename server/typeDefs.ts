const { gql } = require("apollo-server-micro");

export const typeDefs = gql`
  scalar JSON
  scalar JSONObject
  type JSONObjectWithCars {
    myValue: JSON
    myObject: JSONObject
  }

  type fetchCarResponse {
    docs: [Car]
    totalDocs: Int
    limit: Int
    page: Int
    totalPages: Int
    hasNextPage: Boolean
    nextPage: Int
    hasPrevPage: Boolean
    prevPage: Int
    pagingCounter: Int
  }
  type Car {
    _id: ID
    carMake: String
    carCost: String
    carModel: String
    carYear: Int
    carVin: String
    carImage: String
    carInStock: Boolean
  }
  type User {
    _id: ID
    email: String
    hashedPassword: String
  }
  input UserInput {
    email: String
    password: String
  }
  type Query {
    graphqlServerIsOn: String
    findUser: User
    fetchCars: JSONObjectWithCars
    searchCars(
      carMake: String
      carModel: String
      carInStock: String
      carYear: Int
      limit: Int
      page: Int
    ): fetchCarResponse
  }
  type Mutation {
    findUser(_id: String): User
    register(input: UserInput): Boolean
    login(input: UserInput): User
    invalidateTokens: Boolean!
  }
`;
