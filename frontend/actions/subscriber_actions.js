import { fetchChannelSubscribers, 
         postSubscription, 
         deleteSubscription,
         fetchSelfSubscriptions,
         fetchChannelSubscriptions
    } from '../util/subscription';

export const RECEIVE_SUBSCRIPTIONS = "RECEIVE_SUBSCRIPTIONS";
export const RECEIVE_SUBSCRIPTION = "RECEIVE_SUBSCRIPTION";
export const REMOVE_SUBSCRIPTION = "REMOVE_SUBSCRIPTION";
export const RECEIVE_SELF_SUBSCRIPTIONS = "RECEIVE_SELF_SUBSCRIPTIONS";
export const RECEIVE_CHANNEL_SUBSCRIPTIONS = "RECEIVE_CHANNEL_SUBSCRIPTIONS";

const receiveSubscriptions = subscriptions => ({
    type: RECEIVE_SUBSCRIPTIONS,
    subscriptions
});

const receiveSelfSubscriptions = selfSubscriptions => ({
    type: RECEIVE_SELF_SUBSCRIPTIONS,
    selfSubscriptions
});

const receiveChannelSubscriptions = channelSubscriptions => ({
    type: RECEIVE_CHANNEL_SUBSCRIPTIONS,
    channelSubscriptions
});

const receiveSubscription = subscription => ({
    type: RECEIVE_SUBSCRIPTION,
    subscription
});

const removeSubscription = (id) => ({
    type: REMOVE_SUBSCRIPTION,
    id
});

export const requestChannelSubscriptions = id => dispatch => fetchChannelSubscriptions(id)
    .then(channelSubscriptions => dispatch(receiveChannelSubscriptions(channelSubscriptions)));

export const requestSelfSubscriptions = id => dispatch => fetchSelfSubscriptions(id)
    .then(selfSubscriptions => dispatch(receiveSelfSubscriptions(selfSubscriptions)));

export const requestChannelSubscribers = id => dispatch => fetchChannelSubscribers(id)
    .then(subscribers => dispatch(receiveSubscriptions(subscribers)));

export const subscribe = (newSub) => dispatch => postSubscription(newSub)
    .then(subscription => dispatch(receiveSubscription(subscription)));

export const unsubscribe = (id) => dispatch => deleteSubscription(id)
    .then(() => dispatch(removeSubscription(id)));