export default `
  type User {
    _id: String
    firstname: String
    lastname: String
    fullname: String
    email: String
    tenant: Tenant
    updatedAt: String
    createdAt: String
  }

  type Tenant{
      _id: String
      name: String
  }

  type Auth {
    token: String
  }

  type Query {
    getUsers: [User]
  }

  type Mutation {
    signup(firstname: String!, lastname: String!, email: String!, password: String!, avatar: String): Auth
    login(email: String!, password: String!): Auth
  }

  type Subscription {
    userSignedUp: User
  }

  schema {
    query: Query
    mutation: Mutation
    subscription: Subscription
  }



`;
