import gql from "graphql-tag";

const RESET_TOKEN_MUTATION = gql`
  mutation InvalidateTokens {
    invalidateTokens
  }
`;

export const LOGIN_USER_MUTATION = gql`
  mutation LoginUser($input: UserInput) {
    login(input: $input) {
      _id
      email
    }
  }
`;

export const REGISTER_USER_MUTATION = gql`
  mutation CreateUser($input: UserInput) {
    register(input: $input)
  }
`;

export { RESET_TOKEN_MUTATION };
