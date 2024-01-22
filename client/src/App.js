import './App.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Shop from './pages/Shop';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div style={{width: "100%"}}>
      <Shop/>
    </div>
  );
}

export default App;