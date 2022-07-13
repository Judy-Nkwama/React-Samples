import React from 'react';
import EmptyList from './EmptyList';
import Pagination from "./Pagination";
import appConfig from '../config/config';
import { Table, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCard } from "../redux/features/card/cardSlice";
import { useSearchParams } from 'react-router-dom';

const CurrentListProducts = props => {

    const [ searchParams, setSearchParams ] = useSearchParams();
    const category = searchParams.get("category");

    const products = useSelector( (state) => state.products.selectedCategory.products );
    const dispatcher = useDispatch();
    const productsPerPage = appConfig.PAGE_PER_TABLE;
    const productNbr = products.length;

    const currentPage = parseInt( searchParams.get("pg") || 1 );
    
    const pageNbr = Math.ceil( productNbr / productsPerPage );
    if( productNbr % productsPerPage < 0 ) pageNbr++;
    if(currentPage > pageNbr){
        setSearchParams({ category, pg : 1  });
    }

    let from = ( currentPage * productsPerPage ) - productsPerPage ;
    let to = currentPage * productsPerPage ;
    if(to > productNbr) to = productNbr;

    const curentPageProducts = products.slice(from, to);

    return(
        curentPageProducts.map(product => {
            let badgeBg = "bg-secondary ";
            if(product.unitsInStock == 0){
                badgeBg = "bg-danger";
            }else if(product.unitsInStock <= 5){
                badgeBg = "bg-warning";
            }else if(product.unitsInStock > 50 ){
                badgeBg = "bg-success";
            }

            return (
                <tr key={product.id} >
                    <th scope="row"> {product.id} </th>
                    <td> {product.productName} </td>
                    {/* <td> {product.categoryId} </td> */}
                    <td> {product.quantityPerUnit} </td>
                    <td> {product.unitPrice}$ </td>
                    <td> <span className={` badge ${badgeBg}`}>{product.unitsInStock}</span> </td>
                    <td> {Math.round(product.unitPrice * product.unitsInStock)}$ </td>
                    <td>
                        <Button className={`text-white py-1 px-2 ${ product.unitsInStock < 1 && "disabled"}`} onClick={ () => dispatcher( addToCard(product) ) } color="primary"> Add </Button>
                    </td>
                </tr>
            );
        })
    );
};

const ProductList = props => {

    //console.log("product list");

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