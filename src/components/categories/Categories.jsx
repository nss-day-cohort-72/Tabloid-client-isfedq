import { useEffect, useState } from "react";
import { getAllCategories, postCategory } from "../../managers/categoriesManager";
import { Button, Card, Container, Input, InputGroup } from "reactstrap";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");

    useEffect(() => {
        getAllCategories()
            .then(setCategories);
    }, []);

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
    }

    const handleSaveCategory = () => {
        // Save the new category
        const postObj = {name: newCategory}
        postCategory(postObj)
            .then(() => {
                getAllCategories()
                    .then(setCategories);
            });
        // Then, refresh the list of categories
    }
    return (
        <Container className="mt-3 d-flex flex-column align-items-center">
            <h1 className="mb-5">Categories</h1>
            <ul className="list-unstyled">
                {categories.map(category => (
                    <li key={category.id}>
                        <Card className="shadow-sm mb-3">
                            <Container className="d-flex ps-0">
                                <h4 className="m-2">{category.name}</h4>
                            </Container>

                        </Card>
                    </li>
                ))}
            </ul>
            <div className="d-flex">
                <InputGroup>
                    <Input
                        type="text"
                        onChange={handleCategoryChange}
                        />
                    <Button onClick={handleSaveCategory}>save</Button>
                </InputGroup>
            </div>

        </Container>
    )
}