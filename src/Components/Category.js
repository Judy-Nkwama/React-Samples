import React from 'react';
import {ListGroup, ListGroupItem } from "reactstrap";
import { useSearchParams, useNavigate } from 'react-router-dom';

const Category = props => {
    //console.log("Categdry");
    const [searchParams, setSearchParams ] = useSearchParams();
    const navigate = useNavigate();
return(
    <div>
        <h5>Categories</h5>
        <ListGroup>
            <ListGroupItem
                action
                active={ !searchParams.get("category") || searchParams.get("category") == "" }
                tag="button"
                key={0}
                onClick={() => navigate("/products")}
            >
                All products
            </ListGroupItem>
            {
                props.categories.map( cat => {
                     
                    return(
                        <ListGroupItem
                            action
                            active={ searchParams.get("category") && searchParams.get("category") == cat.seoUrl }
                            tag="button"
                            key={cat.id}
                            onClick={ () => setSearchParams({category : cat.seoUrl}) }
                        >
                            {cat.categoryName}
                        </ListGroupItem>
                    );
                })
            }    
        </ListGroup>
    </div>
)} 
export default Category;