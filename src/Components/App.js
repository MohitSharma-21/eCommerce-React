import React from "react";
import { BrowserRouter, Route } from 'react-router-dom';

import Navbar from './Navbar.js';
import Motherboard from './Motherboard';
import Memory from './Memory';
import GraphicsCard from './GraphicsCard';
import Processor from './Processor';
import Home from './Home';
import Cart from './Cart';
import AddProduct from './AddProduct';
import SignIn from './SignIn';
import LogIn from './LogIn';
import Footer from './Footer';

import '../css/App.css';

const App = () => {
    return (<div>
        <BrowserRouter>
            <Navbar />
            <div className="line"></div>
            <div className="mainBody">
                <Route path="/" exact component={Home} />
                <Route path="/motherboard" exact component={Motherboard} />
                <Route path="/memory" exact component={Memory} />
                <Route path="/graphics-card" exact component={GraphicsCard} />
                <Route path="/processor" exact component={Processor} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/add" exact component={AddProduct} />
                <Route path="/sign-in" exact component={SignIn} />
                <Route path="/log-in" exact component={LogIn} />
            </div>
            <Footer />
        </BrowserRouter>

    </div>
    );
}

export default App;