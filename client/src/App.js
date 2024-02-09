import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Shop from './Shop';
import Admin from "./Admin";

function App() {
  const user = useSelector((state) => state.user.userCode);
  const isAdmin = useSelector((state) => state.user.isAdmin);

  return (
      <BrowserRouter>
        {isAdmin === 0 && <Shop user={user}/>}
        {isAdmin === 1 && <Admin/>}
      </BrowserRouter>
  );
}

export default App;