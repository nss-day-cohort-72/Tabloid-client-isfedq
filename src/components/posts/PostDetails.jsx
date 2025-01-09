import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container } from "reactstrap"
import { deletePost, getPostById } from "../../managers/postManager";

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState()
    const [isUsersPost, setIsUsersPost] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";

    const { id } = useParams()
    useEffect(() => {
        getPostById(id).then(p => {
            setPost(p)
            if (loggedInUser.id === p.userProfileId) {
                setIsUsersPost(true)
            }
        })
    }, [id])

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(post.id).then(() => navigate(from))
        }   
    }
    const handleCancel = () => {
        navigate(from)
    }

    return (
        <Card className="shadow-sm mb-3">
            <Container className="d-flex flex-column ps-0 align-items-center">
                <div className="d-flex justify-content-center align-items-center pt-2 p-1">
                    <img style={{height: "100px", width: "100px"}} src={post?.headerImageUrl} alt="/public/emptyAvatar.png" />
                    <h4>{post?.title}</h4>
                </div>
                <div className="d-flex flex-column justify-content-center p-2">
                    <p>{`${post?.content}`}</p>
                    <p>{`Author: ${post?.userProfile?.fullName}`}</p>
                    <p>{`Posted on: ${post?.publicationDate.slice(0, 10) + " " + post?.publicationDate.slice(12, 19)}`}</p>
                </div>
                <Container className="d-flex justify-content-center">
                    {isUsersPost && <Button color="danger" onClick={handleDelete}>Delete Post</Button>}
                    {isUsersPost && <Button color="primary" onClick={handleCancel}>Cancel</Button>}
                </Container>
            </Container>
        </Card>
    )
}