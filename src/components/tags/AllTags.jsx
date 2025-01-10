import { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Input, InputGroup, Row } from "reactstrap";
import { deleteTag, getAllTags, postTag } from "../../managers/TagManager";
import { UserContext } from "../ApplicationViews";
import EditTag from "./EditTag";

export const AllTags = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");
    const [isOpened, setIsOpened] = useState(false);
    const [selectedTag, setSelectedTag] = useState(null);
    const { loggedInUser } = useContext(UserContext);
    const toggle = () => setIsOpened(!isOpened);


    useEffect(() => {
        getAllTags().then(setTags);
    }, [isOpened]);

    const handleTagChange = (e) => {
        setNewTag(e.target.value);
    }

    const handleSaveTag = () => {
        const postObj = { name: newTag };
        postTag(postObj)
            .then(() => {
                getAllTags()
                    .then(setTags);
            });
    }

    const handleEditClick = (Tag) => {
        setSelectedTag(Tag);
        toggle();
    };
    const handleDelete = (e) => {
        const id = parseInt(e.target.dataset.id);
        deleteTag(id).then(() => {
            getAllTags().then(setTags);
        })
    }

    return (
        <Container className="mt-3 d-flex flex-column align-items-center">
            <h1 className="mb-5">All Tags</h1>
            <ul className="list-unstyled">
                {tags.map(tag => (
                    <li key={tag.id}>
                        <Card className="shadow-sm mb-3">
                            <Container className="d-flex ps-0 justify-content-between">
                                <h4 className="m-2 me-4">{tag.name}</h4>
                                <div className="d-flex justify-content-center p-2">
                                    <Button color="link" onClick={() => handleEditClick(tag)} >edit</Button>
                                    <Button color="danger" size="sm" className="ms-3" data-id={tag.id} onClick={handleDelete}>Delete</Button>
                                </div>
                            </Container>
                        </Card>
                    </li>
                ))}
            </ul>
            {loggedInUser.roles?.some(r => r === "Admin") && (
                <div className="d-flex">
                    <InputGroup>
                        <Input
                            type="text"
                            value={newTag}
                            onChange={handleTagChange}
                            placeholder="New tag name"
                        />
                        <Button color="primary" onClick={handleSaveTag} >Add</Button>
                    </InputGroup>
                </div>
            )}
            {selectedTag && (
                            <EditTag
                                isOpen={isOpened}
                                toggle={toggle}
                                tag={selectedTag}
                               
                            />
                        )}
        </Container>
    )
}