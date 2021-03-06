export const fetchChannelSubscribers = userId => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${userId}/subscriptions`
    })
}

export const fetchChannelSubscriptions = userId => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${userId}/subscriptions`,
        data: { status: "channel-subscriptions" }
    })
}

export const fetchSelfSubscriptions = userId => {
    return $.ajax({
        method: "GET",
        url: `/api/users/${userId}/subscriptions`,
        data: { status: "self-subscriptions" }
    })
}

export const postSubscription = subscription => {
    return $.ajax({
        method: "POST",
        url: `/api/subscriptions`,
        data: { subscription }
    })
}

export const deleteSubscription = id => {
    return $.ajax({
        method: "DELETE",
        url: `/api/subscriptions/${id}`
    })
}