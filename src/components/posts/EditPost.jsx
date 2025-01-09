import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Form, Container } from "reactstrap";
import { editPost, getPostById } from "../../managers/postManager";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export const EditPost = () => {
    const [post, setPost] = useState({});
    const { id } = useParams();
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        getPostById(id).then(p => {
            setPost({
                id: p.id, 
                title: p.title, 
                content: p.content, 
                categoryId: p.categoryId, 
                headerImageUrl: null
            })
        })
    }, [id]) 

    const editFieldHandler = (e) => {
        setPost({
            ...post,
            [e.target.name]: e.target.value
        });
        console.log(e.target.name)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        editPost(post).then(() => {
            navigate(from)
        })
    };
    const handleCancel = (e) => {
        e.preventDefault();
        navigate(from)
    }

    return (
        <Form>
            <fieldset>
                <legend>Edit Post</legend>
                <Container className="d-flex flex-column align-items-center">
                    <FormGroup className="d-flex flex-column align-items-center">
                        <Label for="title">Title</Label>
                        <Input style={{width: "400px"}} type="text" name="title" id="title" value={post.title || ''} onChange={(e) => editFieldHandler(e)} />
                    </FormGroup>
                    <FormGroup className="mb-3">
                        <Label for="content"></Label>
                        <Input style={{ width: "600px", height: "200px", resize: "none" }}
                               type="textarea" 
                               name="content" 
                               id="content" 
                               value={post.content || ''} 
                               onChange={(e) => editFieldHandler(e)} 
                               />
                    </FormGroup>
                    <Container className="d-flex justify-content-center">
                        <Button color="primary" type="submit" onClick={handleSubmit}>Save</Button>
                        <Button color="danger" className="warning" type="submit" onClick={handleCancel}>Cancel</Button>
                    </Container>
                </Container>
            </fieldset>
        </Form>
    );
}