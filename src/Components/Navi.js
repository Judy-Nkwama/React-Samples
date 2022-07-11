import React, {useState} from 'react';
import {
    Navbar, NavbarBrand, Nav, UncontrolledDropdown,
    DropdownToggle, DropdownItem, DropdownMenu, Badge
} from "reactstrap";

const Navi = props => {

    const CardItems = () => {
        if( props.card.length > 0){
            return(
                <div>
                    {props.card.map( item => {
                        return(
                            <DropdownItem key={item.id}> 
                                <Badge color="danger" onClick={() => props.removeFromCard(item)}>x</Badge> 
                                {" " + item.name + " "}
                                <Badge color="info">{item.quantity}</Badge>
                            </DropdownItem>
                        );
                    })}
                    <DropdownItem divider />
                    <DropdownItem> Total : { Math.round( props.card.reduce( (total, item) => total + (item.price * item.quantity), 0 ) )}$ </DropdownItem>
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
                    <UncontrolledDropdown inNavbar nav >
                        <DropdownToggle caret nav > Your Card : {props.card.length} items</DropdownToggle>
                        <DropdownMenu right>
                            <CardItems />
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    )
}
export default Navi;