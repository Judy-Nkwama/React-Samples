import React from 'react';
import { ListGroup, ListGroupItem } from "reactstrap";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, targetAllProducts } from "../redux/features/products/productSlice";

const CatIcon = props => {
    return(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={`bi ${props.icon_name}`} viewBox="0 0 16 16">
            <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
            <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
        </svg>
    );
};

const Category = props => {

    //console.log("Category");
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const categories = useSelector((state) => state.products.categories);
    const currentCategoryName = useSelector((state) => state.products.selectedCategory.categoryName );

    return (
        <div>
            <h5 >Categories</h5>
            <ListGroup>
                <ListGroupItem
                    action
                    active={ currentCategoryName == "All" }
                    tag="button"
                    key={0}
                    onClick={() => {
                        navigate("/products?category=all&pg=1");
                        dispatcher(targetAllProducts());
                    }}
                >
                    <CatIcon icon_name="bi-tags"/> All products
                </ListGroupItem>
                {
                    categories.map(cat => {
                        return (
                            <ListGroupItem
                                action
                                active={ currentCategoryName == cat.categoryName }
                                tag="button"
                                key={cat.id}
                                onClick={() => {
                                    navigate(`/products?category=${cat.seoUrl}&pg=1`);
                                    dispatcher(selectCategory(cat));
                                }}
                            >
                                <CatIcon icon_name="bi-tags"/> {cat.categoryName}
                            </ListGroupItem>
                        );
                    })
                }
            </ListGroup>
        </div>
    );
};
export default Category;