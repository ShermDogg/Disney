import { gql } from "@apollo/client";


export const ADD_USER = gql`


   mutation addUser($name:String!, $email:String!, $password:String!) {
     addUser(name: $name email: $email password: $password ) 
      
     

    }
   
    
    
  


`


 export const LOG_IN = gql `
 

 mutation login($email:String!, $password:String!) {
   login(email: $email password:$password) 
     
   



 }
 
 
 
 
 
 
 
 
 
 `