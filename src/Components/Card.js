import React from 'react';
import {Button, Table} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCard } from "../redux/features/card/cardSlice";

const Card = props => {

    const dispatcher = useDispatch();
    const card = useSelector( (state) => state.card.cardProducts );

    return(
        <div>
            <h5>Your Card</h5>
            <Table
                responsive
            >
                <thead>
                    <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Quantity </th>
                        <th> Unit Price </th>
                        <th> Total Price </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {card.map(product => {
                        return (
                            <tr key={product.id}>
                                <th scope="row"> {product.id} </th>
                                <td> {product.name} </td>
                                <td> {product.quantity} </td>
                                <td> {product.price}$ </td>
                                <td> { (parseFloat(product.price) * parseFloat(product.quantity)).toFixed(2) }$ </td>
                                <td><Button onClick={() => dispatcher( removeFromCard(product) )} className="text-white" color="danger"> Delete </Button></td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default Card;