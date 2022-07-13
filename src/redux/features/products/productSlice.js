import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
    name : "products",
    initialState : {
        categories : [],
        allProducts : [],
        selectedCategory : {
            products : [],
            categoryName : ""
        }
    },
    reducers : {
        setCategories : ( state, action ) => {
            state.categories = action.payload;
        },

        setAllProducts : (state, action) => {
            state.allProducts = action.payload;
        },

        selectCategory : (state, action) => {
            state.selectedCategory.categoryName = action.payload.categoryName;
            if( state.allProducts.length > 0 ){
                state.selectedCategory.products = state.allProducts.filter( product => product.categoryId == action.payload.id )
            }
        },

        targetAllProducts : (state) => {
            state.selectedCategory.products = state.allProducts;
            state.selectedCategory.categoryName = "All";
        },

        setToNotegory  : (state) => {
            state.selectedCategory.products = [];
            state.selectedCategory.categoryName = "Undefined list of ";
        },
    }
});

export const { setCategories, setAllProducts, selectCategory, targetAllProducts, setToNotegory } = productSlice.actions;
export default productSlice.reducer;