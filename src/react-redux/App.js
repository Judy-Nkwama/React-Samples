import React from 'react';
import AddOne from './components/AddOne';
import AddX from './components/AddX';
import RemoveOne from './components/RemoveOne';
import { useSelector } from 'react-redux';

const App = props => {
    const couterValue = useSelector((state) => state.counter.value);


    return (
        <div className='w-100 d-flex flex-column align-items-center'>
            <div className='d-flex px-3'>
                <RemoveOne />
                <span>{couterValue}</span>
                <AddOne />
            </div>
            <AddX />
        </div>
    )
};
export default App;