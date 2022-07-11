import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from 'reactstrap';
import Category from './Components/Category';
import ProductList from './Components/ProductList';
import Navi from "./Components/Navi";

const App = props => {
    
    let categories = [];
    
    const [state, setState] = useState({
        categories : categories,
        selectedCategory : null
    });

    useEffect( () => {
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => {
            setState({...state, categories : data})
        })
        .catch(ex => {
            console.log(ex.message);
        })
    }, [] );

    const handleChangeCat = newCat =>{
        setState({...state, selectedCategory : newCat});
    }

return(
    <Container className="main-container h-100">
        <Row className="bg-white py-3">
            <Navi/>
        </Row>
        <Row className="mt-2">
            <Col xs="4" md="3" lg="2" className="p-0">
                <Category 
                    state={state}
                    onSelectedCatChange={handleChangeCat}
                />
            </Col>
            <Col xs="8" m="9" lg="10">
                <ProductList selectedCategory={state.selectedCategory} />
            </Col>
        </Row>
    </Container>
)};

export default App;