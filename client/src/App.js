import './App.css';
import Shop from './pages/Shop';
import Search from './pages/Search';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route index element = {<Shop />} />
          <Route path="/shop" element = {<Shop />} />
          <Route path="/search" element = {<Search />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;