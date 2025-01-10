import { useEffect } from "react";
import { useState } from "react";
import { getAllPosts } from "../../managers/postManager";
import { Card, Col, Container, Input, Label, Row } from "reactstrap";
import { PostCard } from "../PostCard";
import { getAllCategories } from "../../managers/categoriesManager";
import { getAllTags } from "../../managers/TagManager";

export const Explore = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [allTags, setAllTags] = useState([]);

    useEffect(() => {
        getAllPosts().then(setAllPosts);
        getAllCategories().then(setCategories);
        getAllTags().then(setAllTags);
    }, []);
    useEffect(() => {
        setFilteredPosts(allPosts);
    }, [allPosts]);

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
        setSelectedCategory(selectedCategoryId);
        if (selectedCategoryId === "") {
            setFilteredPosts(allPosts);
        } else {
            const filteredPosts = allPosts.filter(post => post.categoryId === parseInt(selectedCategoryId));
            setFilteredPosts(filteredPosts);
        }

    }


    return (
        <div>

            <div className="m-4">
                <h1>Explore</h1>
            </div>
            <Container fluid className="mx-3">
                <Row className="mb-3">
                    <Col  className="d-flex justify-content-end">
                        <div className="text-center d-flex">
                        <Input
                            type="select"
                            name="category"
                            onChange={handleCategoryChange}
                            value={selectedCategory || ""}
                            className="w-auto ml-auto"
                            placeholder="select category"
                            >
                                <option value="" disabled>
                                    Select category
                                </option>
                                <option value="" >
                                    All
                                </option>
                                {categories.map(category => (
                                    <option key={category.id} value={category?.id}>
                                        {category.name}
                                    </option>

                                ))}
                            </Input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md="3" >
                        <h4>search by tag</h4>
                        {allTags.map(tag => {
                            return (
                                <Card className="shadow-sm mb-3">
                                    <Container className="d-flex ps-0 ">
                                        <h4 className="m-2 me-4">{tag.name}</h4>
                                    </Container>
                                </Card>
                            )
                        
                        })}

                    </Col>
                    <Col md="9">
                        {filteredPosts.map(post => {
                            return (
                                <PostCard key={post.id} post={post} />
                            )
                        })}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}