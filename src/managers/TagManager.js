const api_url = '/api/tag';
export const getAllTags = () => {
    return fetch(`${api_url}`)
        .then(res => res.json());
}