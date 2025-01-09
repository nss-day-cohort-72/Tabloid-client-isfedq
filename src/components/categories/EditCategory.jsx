import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { updateCategory } from '../../managers/categoriesManager';


export const EditCategory = ({ isOpen, toggle, category }) => {
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
        if (category) {
            setCategoryName(category.name);
        }
    }, [category]);

    const handleSave = () => {
        const categoryObj = { id: category.id, name: categoryName };
        // Save the updated category
        updateCategory(categoryObj).then(() => {;
        // Call the updateCategory function here
        
        toggle();
        });
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle} backdropClassName="blur">
            <ModalHeader toggle={toggle}>Edit Category</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="categoryName">Change Category</Label>
                        <Input
                            type="text"
                            name="categoryName"
                            id="categoryName"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            placeholder="Enter new category name"
                        />
                    </FormGroup>
                </Form>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSave}>Save</Button>{' '}
                <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
    );
};