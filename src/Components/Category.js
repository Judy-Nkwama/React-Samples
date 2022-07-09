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
                                props.state.selectedCategory.categoryId == cat.categoryId
                                )  ? true : false 
                            }
                            tag="button"
                            key={cat.categoryId}
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