import React, { useState } from "react";
import "./App.css";
import { Container, Row, Col } from 'reactstrap';
import Category from './Components/Category';
import ProductList from './Components/ProductList';
import Navi from "./Components/Navi";

const App = props => {
    
    let categories = [
        {categoryId: 1, categoryName : "Italian"},
        {categoryId: 2, categoryName : "Beverage"},
        {categoryId: 3, categoryName : "Toast"},
        {categoryId: 4, categoryName : "Drinks"}
    ];
    
    const [state, setState] = useState({
        categories : categories,
        selectedCategory : null
    });   

    const handleChangeCat = newCat =>{
        //console.log(newCat);
        setState({...state, selectedCategory : newCat});
    }

return(
    <Container className="main-container h-100">
        <Row className="bg-white py-3">
            <Navi/>
        </Row>
        <Row className="mt-2">
            <Col xs="4" className="p-0">
                <Category 
                    state={state}
                    onSelectedCatChange={handleChangeCat}
                />
            </Col>
            <Col xs="8">
                <ProductList selectedCategory={state.selectedCategory}/>
            </Col>
        </Row>
    </Container>
)};

export default App;