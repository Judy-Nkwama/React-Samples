import { createSlice } from "@reduxjs/toolkit";
//id: product.id, name: product.productName, quantity: 1, price: product.unitPrice
export const cardSlice = createSlice({
    name : "card",
    initialState : {
        cardProducts : [],
    },
    reducers : {
        addToCard : ( state, action ) => {
            if(state.cardProducts.length < 1 ){
                state.cardProducts = [...state.cardProducts, {
                    id: action.payload.id, name: action.payload.productName, quantity: 1, price: action.payload.unitPrice
                }];
            }else{
                const productToAdd = (state.cardProducts.find( product => product.id == action.payload.id ));
                if(productToAdd){
                    const newQuantity = productToAdd.quantity + 1;
                    const withoutTheItemToIncrease = state.cardProducts.filter(product => product.id != action.payload.id);
                    state.cardProducts = [...withoutTheItemToIncrease, {
                        id: action.payload.id, name: action.payload.productName, quantity: newQuantity, price: action.payload.unitPrice
                    } ];
                }else{
                    state.cardProducts = [...state.cardProducts, {
                        id: action.payload.id, name: action.payload.productName, quantity: 1, price: action.payload.unitPrice
                    }];
                }
            }
        },
        removeFromCard : ( state, action ) => { 
            state.cardProducts = state.cardProducts.filter( product => product.id != action.payload.id );
        }
    }
});

export const { addToCard, removeFromCard } = cardSlice.actions;
export default cardSlice.reducer;