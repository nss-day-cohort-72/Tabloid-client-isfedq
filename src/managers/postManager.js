const api_url = '/api/post';
export const getCurrentUserPosts = async (userId) => {
    const response = await fetch(`${api_url}/getbyuser/${userId}`);
    return await response.json();
}


// Create a new post
export const addPost = async (newPost) => {
    const response = await fetch(api_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newPost),
    });

    if (!response.ok) {
        throw new Error("Failed to create post");
    }
    return await response.json();
};

export const getAllPosts = async () => {
    const response = await fetch(`${api_url}`);
    return await response.json();
}

export const getPostById = async (postId) => {
    const response = await fetch(`${api_url}/${postId}`);
    return await response.json();
}

export const editPost = async (post) => {
    console.log(post)
    const response = await fetch(`${api_url}/${post.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post)
    });
}

export const deletePost = async (postId) => {
    const response = await fetch(`${api_url}/${postId}`, {
        method: "DELETE"
    });
}   
