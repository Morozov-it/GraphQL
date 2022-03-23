const PORT = process.env.PORT || 5000;
const express = require('express');
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');


//инициализация приложения
const app = express();
app.use(cors());


//имитация базы данных
const users = [
    { id: 1, username: 'Nik', age: 25 },
    { id: 2, username: 'Kol', age: 20 },
    { id: 3, username: 'Van', age: 30 },
];
const createUser = (input) => {
    const id = Date.now()
    return {id, ...input}
}


//подключение GraphQL
app.use('/graphql', graphqlHTTP({
    graphiql: true, //интерактивная страница работы с запросами
    schema, //схема данных
    rootValue: { //функции для работы с запросами (resolver)
        getAllUsers: () => {
            return users
        },
        getUser: ({ id }) => {
            return users.find(user => user.id == id)
        },
        createUser: ({ input }) => {
            const user = createUser(input)
            users.push(user)
            return user
        }
    }
}));


//запуск приложения
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

