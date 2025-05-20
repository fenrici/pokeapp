import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import SearchContainer from './components/SearchContainer';
import PokemonForm from './components/PokemonForm';
import PokemonDetails from './components/PokemonDetails';
import { PokemonProvider } from './context/PokemonContext';
import './styles/App.css';

function App() {
  return (
    <PokemonProvider>
      <Router>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<SearchContainer />} />
            <Route path="/new" element={<PokemonForm />} />
            <Route path="/pokemon/:id" element={<PokemonDetails />} />
          </Routes>
        </main>
      </Router>
    </PokemonProvider>
  );
}

export default App; 