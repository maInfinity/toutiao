import requests from './request'


export const userLogin = (params) => requests({
    url: '/v1_0/authorizations',
    method: 'post',
    data: params
})

export const userChannels = () => requests({
    url: '/v1_0/user/channels',
    method: 'get',
})

export const channelArticles = (channel_id, timestamp) => requests({
    url: '/v1_0/articles',
    method: 'get',
    params: {
        channel_id,
        timestamp: timestamp
    },
})

export const dislikeArticle = (params) => requests({
    url: '/v1_0/article/dislikes',
    method: 'post',
    data: params
})

export const allChannelListAPI = () => requests({
    url: '/v1_0/channels',
    method: 'get'
})