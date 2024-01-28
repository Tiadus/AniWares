import './App.css';
import Shop from './pages/Shop';
import Search from './pages/Search';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainNavBar from './components/MainNavBar'; 
import Container from 'react-bootstrap/esm/Container';
import Footer from './components/Footer';
import { useState, useEffect } from "react";

function App() {
  const [searchClick, setSearchClick] = useState(0);

  return (
      <BrowserRouter>
        <MainNavBar setSearchClick={setSearchClick}/>
        <div style={{marginTop: "3%"}}>
          <Routes>
            <Route index element = {<Shop />} />
            <Route path="/" element = {<Shop />} />
            <Route path="/search" element = {<Search searchClick={searchClick}/>} />
          </Routes>
        </div>
        <div style={{width: "100%", textAlign: "center", background:"#333333", paddingTop: "1%", marginTop: "4%", paddingBottom: "2%"}}>
                <Container>
                    <Footer />
                </Container>
        </div>
      </BrowserRouter>
  );
}

export default App;