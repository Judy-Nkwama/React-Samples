import { setCategories } from "../redux/features/products/productSlice";

//This function returns an other function that : 
//0) takes a dispatcher function and productsFecherFunction callbact funct as arguments
//1) fetches categories from the API
//2) updates the categories state of the redux store 
// and executes the productsFecherFunction callback with feched categories once categories are ready
//3) throws an error if something goes wrong

export const fetchCategoriesGenerator = (dispacher) => {
    return ( productsFecherFunction ) => {
        fetch("http://localhost:3000/categories")
        .then(response => response.json())
        .then(data => {
            dispacher( setCategories(data) );
            productsFecherFunction(data);
        })
        .catch(ex => {
            //throw new Error(ex.message);
            console.log(ex.message);
        });
    };
};