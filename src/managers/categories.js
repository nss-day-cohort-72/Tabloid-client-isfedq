const api_url = '/api/category';

export const getAllCategories = () => {
    return fetch(`${api_url}/basic`)
        .then(response => response.json())

}