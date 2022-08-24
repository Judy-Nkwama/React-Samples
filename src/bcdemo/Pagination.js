import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import appConfig from '../config/config';

const Pagination = ({onPageChange, currentPage, data}) => {

    
    const productsPerPage = 5;
    const productNbr = data.value.length;
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
                    <button className="page-link" onClick={onPageChange.bind(this, 1)} aria-label="Previous">
                        <span aria-hidden="true">first</span>
                    </button>
                </li>
                <li className={`page-item ${backward}`}>
                    <button className="page-link" onClick={onPageChange.bind(this, currentPage - 1)}>&laquo;</button>
                </li>
                <li className={`page-item active`}>
                    <button className="page-link">{currentPage}</button>
                </li>
                <li className={`page-item ${forward}`}>
                    <button className="page-link" onClick={onPageChange.bind(this, currentPage + 1 )}>&raquo;</button>
                </li>
                <li className={`page-item ${forward}`}>
                    <button className="page-link" aria-label="Next" onClick={onPageChange.bind(this, pageNbr )} >
                        <span aria-hidden="true">last</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;