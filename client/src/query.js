import { gql } from "@apollo/client";

//простой get запрос на получение всего массива
export const GET_ALL_USERS = gql`
    query {
        getAllUsers {
            id, username, age
        }
    }
`;

//запрос на получение конкретной записи с аргументом
export const GET_USER = gql`
    query getUser($id: ID){
        getUser(id: $id) {
            username, age
        }
    }
`;