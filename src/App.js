import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import { useDispatch } from "react-redux";
import { setCategories, setAllProducts, setToNotegory, targetAllProducts, selectCategory } from "./redux/features/products/productSlice";
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

    //console.log(location);

    let fetchUrl



    //fetching categories
    useEffect( () => {


        let categories;
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => {
            categories = data;
            dispatcher( setCategories(data) );
        })
        .catch(ex => {
            console.log(ex.message);
        });

        fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            dispatcher( setAllProducts(data) );

            if(location.search.length == 0 ){
                dispatcher( targetAllProducts() );
            }else{

                const catAdrSeoUrl = searchParam.get("category");
                const cat = categories.find( cat => cat.seoUrl == catAdrSeoUrl);

                if( catAdrSeoUrl && cat ){
                    dispatcher( selectCategory(cat) );
                }else{
                    dispatcher( setToNotegory() );
                }

            }
            
        })
        .catch(ex => {
            console.log(ex.message);
        });

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