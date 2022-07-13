import React, { useEffect } from "react";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { useDispatch } from "react-redux";
import { fetchCategoriesGenerator } from "./db-queries/categories";
import { fetchProductsGenerator } from "./db-queries/products";
import Category from './Components/Category';
import ProductList from './Components/ProductList';
import Navi from "./Components/Navi";
import Redirecte from "./Redirecte";
import Card from "./Components/Card";
import EmptyList from "./Components/EmptyList";
import "./App.css";

const App = props => {

    const dispatcher = useDispatch();
    const [ searchParam, setSearchParams ] = useSearchParams();
    const location = useLocation();

    const fetchCategories = fetchCategoriesGenerator(dispatcher);
    const fetchProducts = fetchProductsGenerator(location, searchParam, dispatcher);

    //fetching categories and products
    useEffect( () => {

        //fetch the categories, once the categories are ready if calls fetchProducts by giving to it the
        //feched categories list
        fetchCategories(fetchProducts);
        
    }, [] );

return(
    <Container className="main-container h-100">
        <Row>
            <Navi />
        </Row>
        <Row className="mt-2">
            <Col xs="4" md="3" lg="2" className="p-0">
                <Category />
            </Col>
            <Col xs="8" m="9" lg="10">
                <Routes>
                    <Route path="/" element={<Redirecte />} />
                    <Route path="products" element={<ProductList />} /> 
                    <Route path="card" element={<Card />} />
                    <Route path="*" element={<EmptyList state="404"/>} />
                </Routes>
            </Col>
        </Row>
    </Container>
)};

export default App;