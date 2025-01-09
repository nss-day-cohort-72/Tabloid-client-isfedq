import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, Container } from "reactstrap"
import { getPostById } from "../../managers/postManager";

export const PostDetails = () => {
    const [post, setPost] = useState()
    // const navigate = useNavigate()
    const { id } = useParams()
    useEffect(() => {
        getPostById(id).then(p => {
            console.log(p)
            setPost(p)
        })
    }, [id])

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
            </Container>
        </Card>
    )
}