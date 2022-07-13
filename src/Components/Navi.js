import React from 'react';
import {
    Navbar, NavbarBrand, Nav, UncontrolledDropdown,
    DropdownToggle, DropdownItem, DropdownMenu, Badge,
    Button
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCard } from "../redux/features/card/cardSlice";

const Cart = props => {
    return(
        <button type="button" className="btn btn-ligth position-relative p-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-cart4" viewBox="0 0 20 20">
                <path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5zM3.14 5l.5 2H5V5H3.14zM6 5v2h2V5H6zm3 0v2h2V5H9zm3 0v2h1.36l.5-2H12zm1.11 3H12v2h.61l.5-2zM11 8H9v2h2V8zM8 8H6v2h2V8zM5 8H3.89l.5 2H5V8zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0zm9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0z" />
            </svg>
            <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${props.itemNumber > 0 ? "bg-warning" : "bg-danger"} `}>
                {props.itemNumber}
                <span className="visually-hidden">cart</span>
            </span>
        </button>
    );
};

const Navi = props => {
    //console.log("navi");
    const navigate = useNavigate();
    const dispatcher = useDispatch();
    const card = useSelector( (state) => state.card.cardProducts );

    const CardItems = () => {
        if( card.length > 0){
            return(
                <div>
                    { card.map( item => {
                        return(
                            <DropdownItem key={item.id} className="d-flex px-2"> 
                                <Badge color="danger" className='fs-6 me-1' onClick={() => dispatcher( removeFromCard(item) )}>x</Badge> 
                                <span className='text-truncate d-inline-block' style={{width : "100px"}} >{ item.name }</span>
                                <Badge color="info" className='fs-6 ms-1'>{item.quantity}</Badge>
                            </DropdownItem>
                        );
                    })}
                    <DropdownItem divider />
                    <DropdownItem className="" > Total : { Math.round( card.reduce( (total, item) => total + ( parseFloat(item.price) * parseInt(item.quantity) ), 0 ) )}$ </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem className="d-flex justify-content-center">
                        <Button className="m-auto px-4" onClick={() => navigate("/card")}>Go to card</Button>
                    </DropdownItem >
                </div>
            );
        }else{
            return(
                <div className="p-3">Empty Card</div>
            );
        }
    };

    return (
        <div className='px-0 border my-2'>
            <Navbar className="bg-white" color="light" expand="md" light >
                <NavbarBrand className="me-auto d-inline-flex align-items-center text-primary" href="/">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-shop me-2" viewBox="0 0 16 16">
                        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z" />
                    </svg>
                    Produts App
                </NavbarBrand>
                <Nav navbar >
                    <UncontrolledDropdown inNavbar nav className='carBlk' >
                        <DropdownToggle caret nav > <Cart itemNumber={card.length} /> </DropdownToggle>
                        <DropdownMenu end>
                            <CardItems />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    );
}
export default Navi;