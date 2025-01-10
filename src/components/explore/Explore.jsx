import { useEffect } from "react";
import { useState } from "react";
import { getAllPosts } from "../../managers/postManager";
import { Col, Container, Input, Label, Row } from "reactstrap";
import { PostCard } from "../PostCard";
import { getAllCategories } from "../../managers/categoriesManager";

export const Explore = () => {
    const [allPosts, setAllPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        getAllPosts().then(setAllPosts);
        getAllCategories().then(setCategories);
    }, []);
    useEffect(() => {
        setFilteredPosts(allPosts);
    }, [allPosts]);

    const handleCategoryChange = (e) => {
        const selectedCategoryId = e.target.value;
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
            <Container>
                <Row className="mb-3">
                    <Col className="d-flex justify-content-end">
                        <div className="text-center d-flex">
                        <Input
                            type="select"
                            name="category"
                            onChange={handleCategoryChange}
                            className="w-auto ml-auto"
                            placeholder="select category"
                            >
                                <option value="" disabled selected>
                                    Select category
                                </option>
                                <option value="" >
                                    All
                                </option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>

                                ))}
                            </Input>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <h4>search by tag section</h4>
                    </Col>
                    <Col>
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