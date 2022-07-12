import React from 'react'; 
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { addOne } from './redux/features/counter/counterSlice';

const AddOne = props => {
    const dispatcher = useDispatch();
    return(
        <Button color='success' onClick={ ()=> dispatcher( addOne() ) }>+1</Button>
    )
};
export default AddOne;