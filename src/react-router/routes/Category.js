import React, { useEffect, useState } from 'react';
import {Link, Outlet, useParams} from 'react-router-dom';

    const Category = props => {

        const [categories, setCategories] = useState([]);
        const [products, setProducts] = useState([]);
        const params = useParams();

        useEffect( () => {
            fetch("http://localhost:3000/categories")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(ex => {
                console.log(ex.message);
            })
        }, [] );

        useEffect( () => {
            let dataUrl;
            let category = categories.find( category => category.seoUrl == params.seoUrl);
            if(params.seoUrl == "all"){
                dataUrl = "http://localhost:3000/products";
            }else if( category ){
                dataUrl = `http://localhost:3000/products?categoryId=${category.id}`;
            }else return;
            
            fetch(dataUrl)
            .then(response => response.json())
            .then(data => setProducts(data))
            .catch(ex => {
                console.log(ex.message);
            })
        }, [params.seoUrl] );

        

    return(
        <div>
            <h5>Categories Page</h5>
            <nav>
                {categories.map( cat => {
                    return (
                        <div key={cat.id} >
                            <Link to={`/categories/${cat.seoUrl}`}>{cat.categoryName}</Link>
                        </div>
                    );
                })}
            </nav>
            <div> {products.length > 0 && params.seoUrl != "all" ? categories.find( category => category.seoUrl == params.seoUrl).categoryName : "All" }</div>
            <div> { 
                products.map( product => <div key={product.id}>{ product.id + " " + product.productName}</div> )
            }</div>
            <Outlet />
        </div>
    )};
export default Category;