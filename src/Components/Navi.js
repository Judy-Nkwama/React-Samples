import React from 'react';
import {
    Navbar, NavbarBrand, Nav, UncontrolledDropdown,
    DropdownToggle, DropdownItem, DropdownMenu, Badge,
    Button
} from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCard } from "../redux/features/card/cardSlice";

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
                            <DropdownItem key={item.id}> 
                                <Badge color="danger" onClick={() => dispatcher( removeFromCard(item) )}>x</Badge> 
                                <span className='text-truncate cardMenuItem' style={{width : "50rem"}} >{" " + item.name + " "}</span>
                                <Badge color="info">{item.quantity}</Badge>
                            </DropdownItem>
                        );
                    })}
                    <DropdownItem divider />
                    <DropdownItem> Total : { Math.round( card.reduce( (total, item) => total + ( parseFloat(item.price) * parseInt(item.quantity) ), 0 ) )}$ </DropdownItem>
                    <DropdownItem divider />
                    <div className="d-flex justify-content-center">
                        <Button className="m-auto px-4" onClick={() => navigate("/card")}>Go to card</Button>
                    </div>
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
                <NavbarBrand className="me-auto" href="/"> Produts App </NavbarBrand>
                <Nav navbar >
                    <UncontrolledDropdown inNavbar nav className='carBlk' >
                        <DropdownToggle caret nav > Your Card : {card.length} items</DropdownToggle>
                        <DropdownMenu end>
                            <CardItems />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    )
}
export default Navi;