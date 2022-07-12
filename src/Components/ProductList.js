import React from 'react';
import { Table, Button } from "reactstrap";

const ProductList = props => {
    //console.log("product list");
    const products = props.products;
    
    return (
        <div>
            <h5>{ props.collectioonTitle } Products </h5>
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
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {products.map(product => {
                        return (
                            <tr key={product.id}>
                                <th scope="row"> {product.id} </th>
                                <td> {product.productName} </td>
                                <td> {product.categoryId} </td>
                                <td> {product.quantityPerUnit} </td>
                                <td> {product.unitPrice}$ </td>
                                <td> {product.unitsInStock} </td>
                                <td> {Math.round(product.unitPrice * product.unitsInStock)}$ </td>
                                <td><Button onClick={() => props.addToCard({ id: product.id, name: product.productName, quantity: 1, price: product.unitPrice })} className="text-white" color="info"> Add </Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    )
}
export default ProductList;