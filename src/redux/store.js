import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./features/products/productSlice";
import cardReduce from "./features/card/cardSlice";
export default configureStore({
    reducer : {
        products : productReducer,
        card : cardReduce
    }
});