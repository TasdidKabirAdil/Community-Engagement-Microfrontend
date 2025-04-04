// shell-app/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from 'userApp/Login';
import Register from 'userApp/Register';
import CommunityPanel from 'communityApp/CommunityPanel';


const authClient = new ApolloClient({
  uri: 'http://localhost:4001/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});


const communityClient = new ApolloClient({
  uri: 'http://localhost:4002/graphql',
  credentials: 'include',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ApolloProvider client={authClient}>
              <Login />
            </ApolloProvider>
          }
        />
        <Route
          path="/login"
          element={
            <ApolloProvider client={authClient}>
              <Login />
            </ApolloProvider>
          }
        />
        <Route
          path="/register"
          element={
            <ApolloProvider client={authClient}>
              <Register />
            </ApolloProvider>
          }
        />
        <Route
          path="/communitypanel"
          element={
            <ApolloProvider client={communityClient}>
              <CommunityPanel />
            </ApolloProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
