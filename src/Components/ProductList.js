import React from 'react'; 
const ProductList = props => {
return(
    <div>
        <h5>Category ProductList</h5>
        <div>
            {props.selectedCategory ? props.selectedCategory.categoryName : ""}
        </div>
    </div>
)} 
export default ProductList;