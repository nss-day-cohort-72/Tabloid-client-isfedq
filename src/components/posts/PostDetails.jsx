import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Card, Container, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Input, InputGroup, Label } from "reactstrap"
import { addTagsToPost, deletePost, getPostById } from "../../managers/postManager";
import { getAllTags } from "../../managers/TagManager";
import { use } from "react";

export const PostDetails = ({ loggedInUser }) => {
    const [post, setPost] = useState()
    const [isUsersPost, setIsUsersPost] = useState(false)
    const [allTags, setAllTags] = useState([])
    const [selectedTags, setSelectedTags] = useState([])
    const [employeeDropDown, setEmployeeDropDown] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/";
    const employeeDropdownToggle = () => setEmployeeDropDown(!employeeDropDown);

    const { id } = useParams()
    useEffect(() => {
        getPostById(id).then(p => {
            setPost(p)
            if (loggedInUser.id === p.userProfileId) {
                setIsUsersPost(true)
            }
        })
        getAllTags().then(setAllTags)
    }, [id])

    useEffect(() => {
        if (post) {
            const postTags = post.tags.map(t => t.id)
            setSelectedTags(postTags)
        }
    }, [post])

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePost(post.id).then(() => navigate(from))
        }   
    }
    const handleCancel = () => {
        navigate(from)
    }
    const handleTagChange = (e) => {
        const selectedTagId = parseInt(e.target.value)
        if (selectedTags.includes(selectedTagId)) {
            setSelectedTags(selectedTags.filter(t => t !== selectedTagId))
        }else {
            let copy = [...selectedTags]
            copy.push(selectedTagId)
            setSelectedTags(copy)
        
        }
    }
    const handleDropdownItemClick = (e) => {
        e.stopPropagation();
    };
    const handleTagSave = () => {
        const postObj = { tags: selectedTags }
        addTagsToPost(id, postObj).then(() => {
            getPostById(id).then(p => {
                setPost(p)
                
            })
        })
    }
    

    return (
        <Card className="shadow-sm mb-3">
            <div className="m-3">
                <InputGroup className="d-flex justify-content-end">
                    <Dropdown isOpen={employeeDropDown} toggle={employeeDropdownToggle} className="m-3">
                        <DropdownToggle caret>Choose Tags</DropdownToggle>
                        <DropdownMenu >
                            {allTags.map(tag => (
                                <DropdownItem key={tag.id} >

                                    <Input
                                        type="checkbox"
                                        value={tag.id}
                                        checked={selectedTags.includes(tag.id) ? true : false}
                                        onChange={handleTagChange}
                                        onClick={handleDropdownItemClick}
    
                                        
                                    />
                                    <Label>{tag.name}</Label>
                                    
                                </DropdownItem>
                                    
                            ))}
                        </DropdownMenu>
                    </Dropdown>
                    <Button color="primary" onClick={handleTagSave}>save</Button>
                </InputGroup>

            </div>
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