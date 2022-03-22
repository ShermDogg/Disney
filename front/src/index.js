import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'bootswatch/dist/quartz/bootstrap.min.css';
import App from './App';
import { setContext } from '@apollo/client/link/context';



import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  concat
} from '@apollo/client';



const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  
});

const authMiddleware = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

      

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});



ReactDOM.render(
  <BrowserRouter>
  <ApolloProvider client={client}>
    
    
    <App />,
    </ApolloProvider>
    </BrowserRouter>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

