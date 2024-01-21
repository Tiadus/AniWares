import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';

function App() {
  const[hello, setHello] = useState("");
  useEffect(() => {
    axios.get("/message")
    .then(result => {
      alert(result.data.message);
    });
  }, []);
  return (
    <div className="App">
    </div>
  );
}

export default App;
