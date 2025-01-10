import { useEffect, useState } from "react";
import { deleteCategory, getAllCategories, postCategory } from "../../managers/categoriesManager";
import { Button, Card, Container, Input, InputGroup } from "reactstrap";
import { EditCategory } from "./EditCategory";


export const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [newCategory, setNewCategory] = useState("");
    const [isOpened, setIsOpened] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const toggle = () => setIsOpened(!isOpened);

    useEffect(() => {
        getAllCategories()
            .then(setCategories);
    }, [isOpened]);

    const handleCategoryChange = (e) => {
        setNewCategory(e.target.value);
    }

    const handleSaveCategory = () => {
        const postObj = { name: newCategory };
        postCategory(postObj)
            .then(() => {
                getAllCategories()
                    .then(setCategories);
            });
    }

    const handleEditClick = (category) => {
        setSelectedCategory(category);
        toggle();
    };
    const handleDeleteCategory = (e) => {
        const categoryId = parseInt(e.target.dataset.id);
        // Delete the category
        deleteCategory(categoryId).then(() => {
            // Call the deleteCategory function here
            getAllCategories()
                .then(setCategories);
        });
        // Call the getAllCategories function here
    }

    return (
        <Container className="mt-3 d-flex flex-column align-items-center">
            <h1 className="mb-5">Categories</h1>
            <ul className="list-unstyled">
                {categories.map(category => (
                    <li key={category.id}>
                        <Card className="shadow-sm mb-3">
                            <Container className="d-flex ps-0 justify-content-between">
                                <h4 className="m-2 me-4">{category.name}</h4>
                                <div className="d-flex justify-content-center p-2">
                                    <Button color="link" onClick={() => handleEditClick(category)}>edit</Button>
                                    <Button onClick={handleDeleteCategory} data-id={category.id} color="danger" size="sm" className="ms-3">Delete</Button>
                                </div>
                            </Container>
                        </Card>
                    </li>
                ))}
            </ul>
            <div className="d-flex">
                <InputGroup>
                    <Input
                        type="text"
                        value={newCategory}
                        onChange={handleCategoryChange}
                        placeholder="New category name"
                    />
                    <Button color="primary" onClick={handleSaveCategory}>Add</Button>
                </InputGroup>
            </div>
            {selectedCategory && (
                <EditCategory
                    isOpen={isOpened}
                    toggle={toggle}
                    category={selectedCategory}
                />
            )}
        </Container>
    );
};