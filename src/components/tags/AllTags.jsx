import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "reactstrap";
import { getAllTags } from "../../managers/TagManager";

export const AllTags = () => {
    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        getAllTags().then(setTags);
    }, []);
    return (
        <Container className="mt-3">
        <h1 className="text-center mb-4">All Tags</h1>
        <Row className="justify-content-center">
            {tags.map(tag => (
                <Col key={tag.id} xs="12" sm="10" md="8" lg="6" className="mb-3">
                    <Card className="shadow-sm w-100">
                        <Container className="d-flex ps-0 justify-content-between ">
                            <h4 className="m-2 me-4">{tag.name}</h4>
                        </Container>
                    </Card>
                </Col>
            ))}
        </Row>
    </Container>
    )
}