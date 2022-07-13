import React from 'react';
import EmptyList from './EmptyList';
import { Table, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCard } from "../redux/features/card/cardSlice";

const ProductList = props => {
    //console.log("product list");
    const dispatcher = useDispatch();
    const products = useSelector( (state) => state.products.selectedCategory.products );
    const selectedCategoryName = useSelector( (state) => state.products.selectedCategory.categoryName );

    const Content = () => products.length > 0 ?
        <Table
            hover
            responsive
        >
            <thead>
                <tr>
                    <th> # </th>
                    <th> Product Name </th>
                    {/* <th> categoryId </th> */}
                    <th> Quantity Per Unit </th>
                    <th> Unit Price </th>
                    <th> units In Stock </th>
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
                            {/* <td> {product.categoryId} </td> */}
                            <td> {product.quantityPerUnit} </td>
                            <td> {product.unitPrice}$ </td>
                            <td> {product.unitsInStock} </td>
                            <td> {Math.round(product.unitPrice * product.unitsInStock)}$ </td>
                            <td><Button onClick={ () => dispatcher( addToCard(product) ) } className="text-white" color="info"> Add </Button></td>
                        </tr>
                    );
                })}
            </tbody>
        </Table> : 
        <EmptyList />


    return (
        <div className='h-100'>
            <h5>{ selectedCategoryName } Products </h5>
            <Content />
        </div>
    )
}
export default ProductList;