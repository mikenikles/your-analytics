# admin-api

Provides functionality used by the website, e.g. account creation, auth, etc.

## Fauna DB

### Main database (`your-analytics`)

**Note**: Use the FaunaDB web shell to run the following commands.

#### Server keys

1. Create an admin key
   ```
   CreateKey({
     role: "admin"
   })
   ```
   **Important**: Copy the `secret` to a secure location. It is only visible once.
1. Create a server key
   ```
   CreateKey({
     role: "server"
   })
   ```
   **Important**: Copy the `secret` to a secure location. It is only visible once.

#### Collections

1. Create a `users` collection
   ```
   CreateCollection({name: "users"})
   ```

#### Indices

1. Create a `user_by_issuer` index
   ```
   CreateIndex({
     name: "user_by_issuer",
     source: Collection("users"),
     terms: [{ field: ["data", "issuer"]}],
     unique: true
   })
   ```
