import React, {useState} from 'react';
import {ListGroup, ListGroupItem } from "reactstrap";

const Category = props => {

return(
    <div>
        <h5>Categories</h5>
        <ListGroup>
            {
                props.state.categories.map( cat => {
                    return(
                        <ListGroupItem
                            action
                            active={
                                (props.state.selectedCategory && 
                                props.state.selectedCategory.id == cat.id
                                )  ? true : false 
                            }
                            tag="button"
                            key={cat.id}
                            onClick={ () => props.onSelectedCatChange(cat) }
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