import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './component/Header';

const App: React.FC = () => {
  return (
    <Router>
      <div className='App text-neutral-300'>
        <Header />
        <Routes>
          <Route path='/' element={<h1>Hello world</h1>} />
          <Route path='movie/:id' element={<h1>Movie detail</h1>} />
          <Route path='movies/:type' element={<h1>Movie List Page</h1>} />
          <Route path='/*' element={<h1>404 error</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
