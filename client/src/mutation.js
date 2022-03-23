import { gql } from "@apollo/client";

//post запрос на изменение данных
export const CREATE_USER = gql`
    mutation createUser($input: UserInput) {
        createUser(input: $input) {
            id, username, age,
        }
    }
`