import gql from "graphql-tag";

export const FETCH_SEARCH_DATA_QUERY = gql`
  query {
    fetchCars {
      myObject
      myValue
    }
  }
`;

export const SEARCH_CARS_QUERY = gql`
  query(
    $carModel: String
    $carMake: String
    $limit: Int
    $page: Int
    $carYear: Int
    $carInStock: String
  ) {
    searchCars(
      carModel: $carModel
      carMake: $carMake
      carInStock: $carInStock
      limit: $limit
      page: $page
      carYear: $carYear
    ) {
      docs {
        _id
        carCost
        carImage
        carInStock
        carMake
        carModel
        carVin
        carYear
      }
      hasNextPage
      nextPage
    }
  }
`;

export const FIND_USER_QUERY = gql`
  query FindUser {
    findUser {
      email
      hashedPassword
    }
  }
`;

export const CHECKING_GRAPHQLSERVER_QUERY = gql`
  query {
    graphqlServerIsOn
  }
`;
