import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

import App from './App';

import { SERVER_URL } from "./schared/constants";

const client = new ApolloClient({
    uri: SERVER_URL
});

ReactDOM.render(
  <React.StrictMode>
      <Router>
          <ApolloProvider client={ client } >
            <App/>
          </ApolloProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

