## GraphiQL

query {
  getAllUsers {
    id, username, age, posts {title, content}
  }
}

query {
  getUser(id: 1) {
    id, username, age, posts {title, content}
  }
}

mutation {
  createUser(input: {
    username: "venia",
    age: 30,
    posts: [{
      title: "new post",
      content: "my content"
    }]
  }) {
    username, id, age,
  }
}


# Fragments
fragment userWithoutAge on User {
  id, username
}

query {
  getAllUsers {
    ...userWithoutAge, posts {title, content}
  }
}