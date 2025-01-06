import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap

// Find the root element
const container = document.getElementById('root');
const root = createRoot(container);

// Render the app with ApolloProvider
root.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);
