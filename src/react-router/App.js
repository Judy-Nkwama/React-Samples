import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Home from './routes/Home';
import Expences from './routes/Expences';
import Invoices from './routes/Invoices';
import Category from './routes/Category';

const App = props => {

    return(
        <div>
            <h1>Main page</h1>
            <nav>
                <Link to="/invoices">invoices</Link> <br/>
                <Link to="/expences">expences</Link> <br/>
                <Link to="/categories/all">categories</Link>
            </nav>
            <div>
                <h5>Main page Changing Block (stick to home, the only route)</h5>
                <Routes>
                    <Route path="/" element={<Home />} >
                        <Route path="expences" element={<Expences />} />
                        <Route path="invoices" element={<Invoices />} />
                        <Route path="categories/:seoUrl" element={<Category />} />
                    </Route>
                    <Route path="*" element={<div>404 You ara lost! <Link to="/">Go back to main page</Link></div>} />
                </Routes>
            </div>
        </div>
    )} 
export default App;