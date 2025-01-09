const api_url = '/api/category';

export const getAllCategories = () => {
    return fetch(`${api_url}/basic`)
        .then(response => response.json())

}

export const postCategory = (category) => {
    return fetch(`${api_url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
}
export const updateCategory = (category) => {
    return fetch(`${api_url}/${category.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category)
    })
}