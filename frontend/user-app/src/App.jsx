import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Login from './components/Login'
import Register from './components/Register'

const client = new ApolloClient({
  uri: 'http://localhost:4001/graphql', // Set this to your actual GraphQL endpoint
  cache: new InMemoryCache(),
  credentials: 'include'
});

function App() {

  return (
    <div className='App'>
      <ApolloProvider client={client}>
        <Login />
        <Register />
      </ApolloProvider>
    </div>
  );
}

export default App;
