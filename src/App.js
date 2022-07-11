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
    const [ card, setCard ] = useState([]);

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
    };
    
    const addToCard = newItem => {
        const localCard = Array.from(card);
        if( localCard.find( item => {
            const matches = item.name === newItem.name;
            if(matches) item.quantity++;
            setCard(localCard);
            return matches;
        }) ) return;

        localCard.push(newItem);
        setCard(localCard);
    };

return(
    <Container className="main-container h-100">
        <Row>
            <Navi card={card}/>
        </Row>
        <Row className="mt-2">
            <Col xs="4" md="3" lg="2" className="p-0">
                <Category 
                    state={state}
                    onSelectedCatChange={handleChangeCat}
                />
            </Col>
            <Col xs="8" m="9" lg="10">
                <ProductList addToCard={addToCard} selectedCategory={state.selectedCategory} />
            </Col>
        </Row>
    </Container>
)};

export default App;