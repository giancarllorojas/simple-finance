import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import Store from './store'
import App from './App';
import './index.css'
import { graphQlClient } from './graphql';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
      <ApolloProvider client={graphQlClient}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
