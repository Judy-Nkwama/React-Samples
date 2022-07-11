import React, {useState} from 'react';
import {
    Navbar, NavbarBrand, Nav, UncontrolledDropdown, NavbarText, 
    DropdownToggle, DropdownItem, DropdownMenu
} from "reactstrap";
const Navi = props => {

    return (
        <div className='px-0 border my-2'>
            <Navbar className="bg-white" color="light" expand="md" light >
                <NavbarBrand className="me-auto" href="/"> Produts App </NavbarBrand>
                <Nav navbar >
                    <UncontrolledDropdown inNavbar nav >
                        <DropdownToggle caret nav > Card : {props.card.length} items</DropdownToggle>
                        <DropdownMenu right>
                            {props.card.map( item => <DropdownItem key={item.id}> {item.name} : {item.quantity} </DropdownItem>)}
                            <DropdownItem divider />
                            <DropdownItem> Total : { Math.round( props.card.reduce( (total, item) => total + (item.price * item.quantity), 0 ) ) }$ </DropdownItem>
                        </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
            </Navbar>
        </div>
    )
}
export default Navi;