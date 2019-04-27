import axios from 'axios'
import {memoize} from 'lodash'
import { PageInfo, Reply, PostInfo, ResponseData } from '../types'

const graphApi = 'https://graph.facebook.com'
const { ACCESS_TOKEN, APP_ID, APP_SECRET, PAGE_ID } = process.env

export const replyToComment = async (commentId: string, {message, imageUrl}: Reply) => {
    const fullUrl = `${graphApi}/v3.2/${commentId}/comments?access_token=${ACCESS_TOKEN}`

    try {
        const data = {
            message: message,
            attachment_url: imageUrl
        }
        console.log('Start replying to ' + commentId)
        const response = await axios.post(fullUrl, data)
        console.log('Finished replying to ' + commentId)
        console.log('Result', response.data)
    } catch (err) {
        const error = err.response.data
        console.error(error)
    }
}

export const getPageToken = async (exchangeToken: string) => {
    const userTokenUrl = `${graphApi}/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${exchangeToken}`
    const userResponse = await axios.get(userTokenUrl)
    const userAccessToken =  userResponse.data.access_token

    const pageTokenUrl = `${graphApi}/v3.2/me/accounts?access_token=${userAccessToken}`
    const pageResponse = await axios.get<ResponseData<PageInfo[]>>(pageTokenUrl)

    const pages = pageResponse.data.data
    const page = pages.find(p => p.id === PAGE_ID)
    return page
}

const getPostInfo = async (postId: string) => {
    console.log(`Getting info of post ${postId}`)
    const postInfoUrl = `${graphApi}/v3.2/${postId}?access_token=${ACCESS_TOKEN}`
    const postResponse = await axios.get<PostInfo>(postInfoUrl)

    const postInfo = postResponse.data
    console.log('Post info', postInfo)
    return postInfo
}

export const getPostInfoCached = memoize(getPostInfo)