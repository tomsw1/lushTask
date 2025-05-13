# Lush Coding Assignment: Simple Task List - Tom Walters

This is my solution to the task list GraphQL API assignment. It is based upon [this](https://github.com/prisma/prisma-examples/tree/d512087f98ad02880ed0f7ec43947c99175104ad/orm/graphql) example published by prisma.

## Contents

- [Getting Started](#getting-started)
- [Usage](#Usage)

## Getting started

### 1. 

Clone this repository then install npm dependencies:

```
npm install
```


### 2. Create and seed the database

Run the following command to create the database. This also creates the `Task` table that is defined in [`prisma/schema.prisma`](./prisma/schema.prisma):

```
npx prisma migrate dev --name init
```

When `npx prisma migrate dev` is executed against a newly created database, seeding is also triggered. The seed file in [`prisma/seed.ts`](./prisma/seed.ts) will be executed and the database will be populated with the sample data.

### 3. Start the GraphQL server

Launch the GraphQL server with this command:

```
npm run dev
```

Navigate to [http://localhost:4000](http://localhost:4000) in your browser to explore the API


## Usage

The schema that specifies the API operations of the GraphQL server is defined in [`./schema.graphql`](./schema.graphql). Below are a number of operations that you can send to the API.

### Retrieve all tasks

```graphql
query {
  tasks {
    id
    title
    completed
    createdAt
    updatedAt
  }
}
```

<details><summary><strong>See more API operations</strong></summary>

### Retrieve all tasks filtered by search string

```graphql
query {
  tasks(search: "bath") {
    id
    title
    completed
    createdAt
    updatedAt
  }
}

```


### Create a new task

```graphql
mutation {
  addTask(title: "Read result of this operation") {
    id
    title
    createdAt
    completed
    updatedAt
  }
}
```

### Toggle a task's completed status

```graphql
mutation {
  toggleTask(id: 1) {
    id
    title
    completed
    createdAt
    updatedAt
  }
}
```

### Delete a task

```graphql
mutation {
  deleteTask(id: 1) {
    id
    title
    createdAt
    completed
    updatedAt
  }
}
```

</details>