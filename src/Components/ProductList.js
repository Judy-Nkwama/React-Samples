import React from 'react';
import EmptyList from './EmptyList';
import Pagination from "./Pagination";
import appConfig from "../config/config";
import { Table, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCard } from "../redux/features/card/cardSlice";
import { useSearchParams } from 'react-router-dom';



const CurrentListProducts = props => {

    const [ searchParams, setSearchParams ] = useSearchParams();
    
    const products = useSelector( (state) => state.products.selectedCategory.products );
    const dispatcher = useDispatch();
    const currentPage = parseInt( searchParams.get("pg") || 1 );
    const productNbr = products.length;
    
    const pageNbr = Math.ceil( productNbr / appConfig.PAGE_PER_TABLE );
    if( productNbr % appConfig.PAGE_PER_TABLE < 0 ) pageNbr++;



    return(
        products.map(product => {
            return (
                <tr key={product.id}>
                    <th scope="row"> {product.id} </th>
                    <td> {product.productName} </td>
                    {/* <td> {product.categoryId} </td> */}
                    <td> {product.quantityPerUnit} </td>
                    <td> {product.unitPrice}$ </td>
                    <td> {product.unitsInStock} </td>
                    <td> {Math.round(product.unitPrice * product.unitsInStock)}$ </td>
                    <td><Button onClick={ () => dispatcher( addToCard(product) ) } className="text-white py-0 px-1 " color="info"> Add </Button></td>
                </tr>
            );
        })
    );
}






const ProductList = props => {
    //console.log("product list");
    const dispatcher = useDispatch();
    const products = useSelector( (state) => state.products.selectedCategory.products );
    const selectedCategoryName = useSelector( (state) => state.products.selectedCategory.categoryName );

    const Content = () => products.length > 0 ?
        <Table hover responsive className='border' >
            <thead className='rounded-top'>
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
            <tbody className='bg-white'>
                <CurrentListProducts />
            </tbody>
            <tfoot >
                <tr>
                    <td colSpan={7}>
                        <Pagination />
                    </td>
                </tr>
            </tfoot>
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