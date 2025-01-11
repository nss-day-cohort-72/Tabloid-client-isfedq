const api_url = "/api/subscription";

export const createSubscription = (subscription) => {
    console.log(subscription)
    return fetch(`${api_url}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    })
}

export const deleteSubscription = (authorId, userId) => { 
    return fetch(`${api_url}/delete/${authorId}/${userId}`, {
        method: "PUT"
    })
}

export const checkSubscription = (authorId, userId) => {
    return fetch(`${api_url}/check-subscription/${authorId}/${userId}`)
    .then(res => res.json())
}

export const getSubscriptions = (userId) => {
    return fetch(`${api_url}/get-subscriptions/${userId}`)
    .then(res => res.json())
}