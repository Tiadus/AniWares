import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Shop from './Shop';

function App() {
  const user = useSelector((state) => state.user.userCode);

  return (
      <BrowserRouter>
        <Shop user={user}/>
      </BrowserRouter>
  );
}

export default App;