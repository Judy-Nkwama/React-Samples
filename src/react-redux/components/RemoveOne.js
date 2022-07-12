import React from 'react'; 
import { Button } from 'reactstrap';
import { useDispatch } from 'react-redux';
import { removeOne } from './redux/features/counter/counterSlice';

const RemoveOne = props => {
    const dispatcher = useDispatch();
    return(
        <Button  color='danger' onClick={() => dispatcher(removeOne()) } >-1</Button>
    )
};
export default RemoveOne;