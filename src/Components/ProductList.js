import React, { useState, useEffect } from 'react';
import {Table} from "reactstrap";

const ProductList = props => {

    const [products, setProducts] = useState([]);
    const url = props.selectedCategory ? `http://localhost:3000/products?categoryId=${props.selectedCategory.id}` : "http://localhost:3000/products";
    
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(data => {
            setProducts(data);
        })
        .catch(ex => {
            console.log(ex.message);
        });
        console.log(products);
    }, [props.selectedCategory]);
    
    return (
        <div>
            <h5>{props.selectedCategory ? `${props.selectedCategory.categoryName} Products` : "Products"}</h5>
            <Table
                hover
                responsive
            >
                <thead>
                    <tr>
                        <th> # </th>
                        <th> productName </th>
                        <th> categoryId </th>
                        <th> quantityPerUnit </th>
                        <th> unitPrice </th>
                        <th> unitsInStock </th>
                        <th> Stock value </th>
                    </tr>
                </thead>
                <tbody>
                    { products.map( product => {
                        return(
                            <tr key={product.id}>
                                <th scope="row"> {product.id} </th>
                                <td> {product.productName} </td>
                                <td> {product.categoryId} </td>
                                <td> {product.quantityPerUnit} </td>
                                <td> {product.unitPrice}$ </td>
                                <td> {product.unitsInStock} </td>
                                <td> {Math.round(product.unitPrice * product.unitsInStock)}$ </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default ProductList;