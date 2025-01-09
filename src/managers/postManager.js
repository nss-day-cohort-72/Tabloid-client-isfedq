const api_url = '/api/post';
export const getCurrentUserPosts = async (userId) => {
    const response = await fetch(`${api_url}/getbyuser/${userId}`);
    return await response.json();
}