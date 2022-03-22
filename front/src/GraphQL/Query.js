
import { gql } from "@apollo/client";


export const users = gql`

query usersQuery{
  
    users{
      name,
      email,
      id,
      avatar,
      password,
      posts{
        email,
        body,
        id
      }
    }
  }



`






