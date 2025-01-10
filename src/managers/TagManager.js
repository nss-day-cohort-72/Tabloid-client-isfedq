const api_url = '/api/tag';
export const getAllTags = () => {
    return fetch(`${api_url}`)
        .then(res => res.json());
}

export const postTag = (tag) => {
    return fetch(`${api_url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(tag)
    });
}