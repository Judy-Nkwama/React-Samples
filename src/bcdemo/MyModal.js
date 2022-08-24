import { useState } from "react";
import {
    Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup,
    Label, Input, Button, Col, Container, Row
} from "reactstrap";

const MyModal = ({ modal, toggleModal, data, table, fetchDataFromBC }) => {

    const [form, setForm] = useState({});

    const handleChange = (event) => {
        setForm({ ...form, [event.target.name] : event.target.value })
    };

    let FormItems = [];
    if (!!data?.value) {
        for (var key in data.value[0]) {
            if (key !== "@odata.etag") {
                FormItems.push(
                    <Col xs="6">
                        <FormGroup key={key} className="">
                            <Label for={key}> {key.replaceAll("_", " ")} </Label>
                            <Input id={key} type="text" name={key} value={form[key] ?? ""} onChange={handleChange} />
                        </FormGroup>
                    </Col>
                );
            }
        }
    }

    const handleNewItem = () => {
        toggleModal();
    };

    const handleCancel = () => {
        toggleModal();
    };

    return (
        <Modal isOpen={modal} toggle={toggleModal} fade={false} scrollable size="lg">
            <ModalHeader toggle={toggleModal}>Add Item to <span className="text-primary">{table}</span> table</ModalHeader>
            <ModalBody>
                <Form>
                    <Container fluid>
                        <Row>{FormItems}</Row>
                    </Container>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleNewItem}> Add Item </Button>
                <Button color="secondary" onClick={handleCancel}> Cancel </Button>
            </ModalFooter>
        </Modal>
    );
};

export default MyModal;