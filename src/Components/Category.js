import React from 'react';
import { ListGroup, ListGroupItem } from "reactstrap";
import { useSearchParams, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { selectCategory, targetAllProducts } from "../redux/features/products/productSlice";

const Category = props => {
    //console.log("Categdry");
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const categories = useSelector((state) => state.products.categories);
    const selectedCategoryName = useSelector((state) => state.products.selectedCategory.categoryName );
    const path = location.pathname;
    return (
        <div>
            <h5>Categories</h5>
            <ListGroup>
                <ListGroupItem
                    action
                    active={ selectedCategoryName == "All"}
                    tag="button"
                    key={0}
                    onClick={() => {
                        navigate("/products");
                        dispatcher(targetAllProducts());
                    }}
                >
                    All products
                </ListGroupItem>
                {
                    categories.map(cat => {
                        return (
                            <ListGroupItem
                                action
                                active={searchParams.get("category") && searchParams.get("category") == cat.seoUrl}
                                tag="button"
                                key={cat.id}
                                onClick={() => {
                                    if(path && path != "/products") navigate("/products");
                                    setSearchParams({ category: cat.seoUrl });
                                    dispatcher(selectCategory(cat));
                                }}
                            >
                                {cat.categoryName}
                            </ListGroupItem>
                        );
                    })
                }
            </ListGroup>
        </div>
    )
}
export default Category;