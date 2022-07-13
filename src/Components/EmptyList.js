import React from 'react';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import { targetAllProducts }from "../redux/features/products/productSlice";
import { useDispatch } from 'react-redux';

const EmptyList = props => {

    const navigate = useNavigate();
    const dispatcher = useDispatch();

    const Icon = state => {
        if(props.state == "404"){
            return(
                <div className='fs-1 bold'>404</div>
            );
        }else{
           return(
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" fill="currentColor" className="bi bi-emoji-neutral" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4 10.5a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 0-1h-7a.5.5 0 0 0-.5.5zm3-4C7 5.672 6.552 5 6 5s-1 .672-1 1.5S5.448 8 6 8s1-.672 1-1.5zm4 0c0-.828-.448-1.5-1-1.5s-1 .672-1 1.5S9.448 8 10 8s1-.672 1-1.5z" />
                </svg>
            );
        }
    }
    return(
        <div className="py-5 bg-white rounded text-secondary d-flex flex-column justify-content-center align-items-center h-100 ">
            <Icon />
            <div className='fs-3'>{ props.state == "404" ? "Oops... You are lost!!" : "Oops... Empty list!!"}</div>
            <Button color='secondary' className=' text-white btn-sm mt-3' onClick={() => {
                navigate("/products?category=all&pg=1");
                dispatcher( targetAllProducts() );
            }} > list all the products</Button>
        </div>
    );
} 
export default EmptyList;