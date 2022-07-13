import React, {useEffect} from 'react'; 
import { useNavigate } from 'react-router-dom';

const Redirecte = props => {
    
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/products?category=1&pg=1");
    });
    return(<>Redirecting...</>);
}
export default Redirecte;