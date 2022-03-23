import { gql } from "@apollo/client";


export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, age
        }
    }
`;

export const GET_USER = (id) => gql`
    query {
        getUser(id: ${id}) {
            id, username, age, posts {title, content}
        }
    }
`;