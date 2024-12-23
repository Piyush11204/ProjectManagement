import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import Home from './pages/Home';
import Project from './pages/Project';
import NotFound from './pages/NotFound';
import Projects from './components/ProjectComponents/Projects';
import Clients from './components/ClientComponents/Clients';
import AddClientModal from './components/ClientComponents/AddClientModal';
import AddProjectModal from './components/ProjectComponents/AddProjectModal';
import Navbar from './components/Navbar';

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache,
});

function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <Router>
          <Navbar />
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/projects/:id' element={<Project />} />
              <Route path='/projects' element={<Projects />} />
              <Route path='/clients' element={<Clients/>} />
              <Route path='/clients/:id' element={<Clients />} />
              <Route path="/addclient" element={<AddClientModal/>} />
              <Route path="/addproject" element={<AddProjectModal/>} />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
