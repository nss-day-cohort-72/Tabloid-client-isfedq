import { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label, Form } from "reactstrap";
import { editPost, getPostById } from "../../managers/postManager";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

export const EditPost = () => {
    const [post, setPost] = useState({id: p.id, title: p.title, content: p.content, categoryId: p.categoryId, headerImageUrl: null});
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

    return (
        <Form>
            <fieldset>
                <legend>Edit Post</legend>
                <FormGroup>
                    <Label for="title">Title</Label>
                    <Input type="text" name="title" id="title" value={post.title || ''} onChange={(e) => editFieldHandler(e)} />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Label for="content">Content</Label>
                    <Input type="text" name="content" id="content" value={post.content || ''} onChange={(e) => editFieldHandler(e)} />
                </FormGroup>
                <Button type="submit" onClick={handleSubmit}>Save</Button>
            </fieldset>
        </Form>
    );
}