import gql from "graphql-tag";

// user object pointing to loginUser to make the return response pretty
export const LOGIN_QUERY = gql`
  mutation loginUser($input: UserInputLogin!) {
    user: loginUser(input: $input) {
      token, errors
    }
  }
`;

export const REGISTER_QUERY = gql`
  mutation RegisterUser($input: UserInputRegister!) {
    user: createUser(input: $input) {
      token, errors
    }
  }
`;

export const GET_USER_QUERY = gql`
  query {
    user: user_auth {
      email
      token
      image
      firstname
      lastname
    }
  }
`;