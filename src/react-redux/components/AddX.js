import React, { useState} from 'react'; 
import { Button, Input } from 'reactstrap';
import { useDispatch } from 'react-redux/es/exports';
import { addx } from './redux/features/counter/counterSlice';

const AddX = props => {

    const dispatcher = useDispatch();
    const [ n, setN] = useState(2);
    return(
        <div className='d-flex p-3'>
            <Input style={{width : "50px"}} type="text" value={n} onChange={ event => setN( parseInt(event.target.value) ) } />
            <Button color='success' onClick={ () => dispatcher( addx (Number(n) || 0)) } >+</Button>
        </div>
        
    )
};
export default AddX;