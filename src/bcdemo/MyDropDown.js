import { useState } from 'react';
import {
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

const MyDroDdown = ({ onActiveTableChange, table }) => {

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen((prevState) => !prevState);

    return (
        <div className="d-flex">
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                <DropdownToggle color="primary" caret>Choose a BC Table</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem
                        onClick={() => onActiveTableChange("PurchaseOrder")}
                        disabled={table === "PurchaseOrder"}
                    >Purchase Orders</DropdownItem>
                    <DropdownItem
                        onClick={() => onActiveTableChange("PaymentJournals")}
                        disabled={table === "PaymentJournals"}
                    >Payment Journals</DropdownItem>
                    <DropdownItem
                        onClick={() => onActiveTableChange("PostedPurchaseReceipts")}
                        disabled={table === "PostedPurchaseReceipts"}
                    >Posted Purchase Receipts</DropdownItem>
                    <DropdownItem
                        onClick={() => onActiveTableChange("Item_Card")}
                        disabled={table === "Item_Card"}
                    >Item Cards</DropdownItem>
                    <DropdownItem
                        onClick={() => onActiveTableChange("Customers")}
                        disabled={table === "Customers"}
                    >Customers</DropdownItem>
                    <DropdownItem
                        onClick={() => onActiveTableChange("Vendors")}
                        disabled={table === "Vendors"}
                    >Vendors</DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
};

export default MyDroDdown;
