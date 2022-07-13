import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import appConfig from '../config/config';

const Pagination = props => {

    const [searchParams, setSearchParams] = useSearchParams();
    
    const category = searchParams.get("category");
    const products = useSelector( (state) => state.products.selectedCategory.products );
    
    const currentPage = parseInt( searchParams.get("pg") || 1 );
    const productNbr = products.length;
    const productsPerPage = appConfig.PAGE_PER_TABLE;
    const pageNbr = Math.ceil( productNbr / productsPerPage );
    
    let forward = "disabled";
    let backward = "disabled";
    if( productNbr % productsPerPage < 0 ) pageNbr++;
    if (  currentPage < pageNbr ) forward = "";
    if ( (currentPage != 1) &&  ( (pageNbr > currentPage) || ( pageNbr > 1 ) ) ) backward = "";


    return (
        <nav aria-label="products pagination">
            <ul className="pagination justify-content-center">
                <li className={`page-item ${backward}`}  >
                    <button className="page-link" onClick={() => { setSearchParams({ category, pg : 1  }); }} aria-label="Previous">
                        <span aria-hidden="true">first</span>
                    </button>
                </li>
                <li className={`page-item ${backward}`}>
                    <button className="page-link" onClick={() => {  setSearchParams({ category, pg : currentPage - 1 }); }}>&laquo;</button>
                </li>
                <li className={`page-item active`}>
                    <button className="page-link" onClick={() => {}}>{currentPage}</button>
                </li>
                <li className={`page-item ${forward}`}>
                    <button className="page-link" onClick={() => { setSearchParams({ category, pg : currentPage + 1 }); }}>&raquo;</button>
                </li>
                <li className={`page-item ${forward}`}>
                    <button className="page-link" aria-label="Next" onClick={() => { setSearchParams({ category, pg : pageNbr }); }} >
                        <span aria-hidden="true">last</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;