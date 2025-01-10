import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { deleteTag, getAllTags, updateTag } from '../../managers/TagManager';


const EditTag = ({ isOpen, toggle, tag }) => {
    const [tagName, setTagName] = useState("");

    useEffect(() => {
        if (tag) {
            setTagName(tag.name);
        }
    }, [tag]);

    const handleSave = () => {
        const tagObj = { id: tag.id, name: tagName };
        updateTag(tagObj).then(() => {
            toggle();
        });
    };
    

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>Edit Tag</ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label for="tagName">Tag Name</Label>
                        <Input
                            type="text"
                            name="tagName"
                            id="tagName"
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            placeholder="Enter new tag name"
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

export default EditTag;