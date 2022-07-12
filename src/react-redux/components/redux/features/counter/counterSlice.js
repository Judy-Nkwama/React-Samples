import { createSlice } from "@reduxjs/toolkit";


export const counterSlice = createSlice({
    name : "counter",
    initialState : {
        value : 0,
    },
    reducers : {
        addOne : (state) => {
            state.value += 1;
        },
        removeOne : (state) => {
            state.value -= 1;
        },
        addx : (state, action) => {
            state.value += action.payload;
        } 
    }
});

export const { addOne, removeOne, addx } = counterSlice.actions;
export default counterSlice.reducer;



