import { selectCategory, setAllProducts, setToNotegory, targetAllProducts } from "../redux/features/products/productSlice";

//fetchProductsGenerator returns a function that the categories list and :  
//1) Fetch products list 
//2) sets the selected category best on the curent url (location)

export const fetchProductsGenerator = (location, searchParam, dispatcher) => {
    return categories => {
        fetch("http://localhost:3000/products")
        .then(response => response.json())
        .then(data => {
            dispatcher(setAllProducts(data));

            const catAdrSeoUrl = searchParam.get("category");
            if (catAdrSeoUrl && catAdrSeoUrl == "all") {
                dispatcher(targetAllProducts());
            } else {
                const cat = categories.find(cat => cat.seoUrl == catAdrSeoUrl);
                if (catAdrSeoUrl && cat) {
                    dispatcher(selectCategory(cat));
                } else {
                    dispatcher(setToNotegory());
                }
            }
        })
        .catch(ex => {
            //throw new Error(ex.message);
            console.log(ex.message);
        });
    };
};