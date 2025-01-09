import { useEffect, useState } from "react";
import { getAllCategories } from "../../managers/categories";
import { Card, Container } from "reactstrap";

export const Categories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getAllCategories()
            .then(setCategories);
    }, []);

    return (
        <Container className="mt-3 d-flex flex-column align-items-center">
            <h1 className="mb-5">Categories</h1>
            <ul className="list-unstyled">
                {categories.map(category => (
                    <li key={category.id}>
                        <Card className="shadow-sm mb-3" >
                            <Container className="d-flex ps-0">
                                <h4 className="m-2">{category.name}</h4>
                            </Container>

                        </Card>
                    </li>
                ))}
            </ul>
        </Container>
    )
}