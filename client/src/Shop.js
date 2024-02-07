import { useState } from 'react';
import MainNavBar from './components/MainNavBar';
import { Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/esm/Container';
import Footer from './components/Footer';
import Home from './pages/Home';
import Search from './pages/Search';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Order from './pages/Order';

const Shop = ({user}) => {
    const [searchClick, setSearchClick] = useState(0);

    return (
        <div style={{height: "100vh", display: "flex", flexDirection:"column"}}>
        <MainNavBar setSearchClick={setSearchClick} user={user}/>
        <div style={{marginTop: "1%", flex:"1"}}>
          <Routes>
            <Route index element = {<Home />} />
            <Route path="/" element = {<Home />} />
            <Route path="/search" element = {<Search searchClick={searchClick} user={user}/>} />
            <Route path="/cart" element = {<Cart user={user} />} />
            <Route path="/account" element = {<Account user={user}/>} />
            <Route path="/order" element = {<Order />} />
          </Routes>
        </div>
        <div style={{width: "100%",
                    textAlign: "center",
                    background:"#333333",
                    paddingTop: "1%",
                    marginTop: "4%",
                    paddingBottom: "2%"}}>
                <Container>
                    <Footer />
                </Container>
        </div>
        </div>
    )
}

export default Shop;