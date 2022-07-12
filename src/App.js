import React, { useState, useEffect } from "react";
import { Routes, Route, useSearchParams, useLocation } from "react-router-dom";
import { Container, Row, Col } from 'reactstrap';
import Category from './Components/Category';
import ProductList from './Components/ProductList';
import Navi from "./Components/Navi";
import Redirecte from "./Redirecte";
import Card from "./Components/Card";
import EmptyList from "./Components/EmptyList";
import "./App.css";


const App = props => {

    
    const [products, setProducts] = useState([]);
    const [ filteredProducts, setFilteredProducts ] = useState([]);
    const [ card, setCard ] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ searchParam, setSearchParams ] = useSearchParams();
    const [ activeCat, setActiveCat ] = useState();
    const location = useLocation();

    //console.log(location);

    //fetching categories
    useEffect( () => {
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => {
            setCategories(data)
        })
        .catch(ex => {
            console.log(ex.message);
        })
    }, [] );

    const activeCatSeoUrl = searchParam.get("category");
    const selectedCategory = categories.find(category => category.seoUrl == activeCatSeoUrl);

    //fecthin
    useEffect(() => {
        fetch("http://localhost:3000/products")
            .then(response => response.json())
            .then(data => {
                setProducts( data );
                setActiveCat(undefined);

                if(location.search.length < 1 ) setFilteredProducts( products );
                else if(categories.length > 0 && selectedCategory){
                    setActiveCat(selectedCategory);
                    setFilteredProducts(products.filter(product => product.categoryId == selectedCategory.id));
                }else setFilteredProducts([]);

            })
            .catch(ex => {
                console.log(ex.message);
            });
    }, []);

    useEffect( () => {
        if(location.search.length < 1 ) setFilteredProducts( products );
        else if(selectedCategory){
            setActiveCat(selectedCategory);
            setFilteredProducts(products.filter(product => product.categoryId == selectedCategory.id));
        }else{
            setActiveCat(undefined);
            setFilteredProducts([]);
        }
    }, [activeCatSeoUrl]);
    
    const addToCard = newItem => {
        const localCard = Array.from(card);
        const priviouslyAdded = localCard.find( item => item.id === newItem.id );
        if(priviouslyAdded){
            priviouslyAdded.quantity += 1;
        }else{
            localCard.push(newItem);
        }
        setCard(localCard);
    };

    const removeFromCard = itemToDelete => {
       setCard( card.filter( cardItem => cardItem.id != itemToDelete.id ));
    };

return(
    <Container className="main-container h-100">
        <Row>
            <Navi removeFromCard={removeFromCard} card={card}/>
        </Row>
        <Row className="mt-2">
            <Col xs="4" md="3" lg="2" className="p-0">
                <Category 
                    categories={categories}
                />
            </Col>
            <Col xs="8" m="9" lg="10">
                <Routes>
                    <Route path="/" element={<Redirecte />} />
                    <Route path="products" element={<ProductList addToCard={addToCard} products={filteredProducts} collectioonTitle={activeCat ? activeCat.categoryName : "All"} />} /> 
                    <Route path="card" element={<Card deleteHadler={removeFromCard} card={card} />} />
                    <Route path="*" element={<EmptyList state="404"/>} />
                </Routes>
            </Col>
        </Row>
    </Container>
)};

export default App;