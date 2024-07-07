import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './pages/Home';
import MovieList from './component/MovieList';
import MovieDetails from './pages/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <div className='App text-neutral-300'>
        <Header />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='movie/:id' element={<MovieDetails/>} />
          <Route path='movies/:type' element={ <MovieList/>} />
          <Route path='/*' element={<h1>404 error</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
