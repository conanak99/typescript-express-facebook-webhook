import axios from 'axios'
import { PageInfo, Comment } from './types';

const graphApi = 'https://graph.facebook.com'
const { ACCESS_TOKEN, APP_ID, APP_SECRET, PAGE_ID } = process.env

export const replyToComment = async ({commentId, name, message} : Comment) => {
    const fullUrl = `${graphApi}/v3.2/${commentId}/comments?access_token=${ACCESS_TOKEN}`

    try {
        const data = {
            message: `Hello ${name} From Code Bot. Your message is ${message} `,
            attachment_url: 'https://www.catster.com/wp-content/uploads/2018/07/Savannah-cat-long-body-shot.jpg'
        }
        console.log('Start replying to ' + commentId)
        const response = await axios.post<{ id: string }>(fullUrl, data)
        console.log('Finished replying to ' + commentId)
        return response.data
    } catch (err) {
        const error = err.response.data
        console.error(error)
    }
    return false
}

export const getPageToken = async (exchangeToken: string) => {
    const userTokenUrl = `${graphApi}/oauth/access_token?grant_type=fb_exchange_token&client_id=${APP_ID}&client_secret=${APP_SECRET}&fb_exchange_token=${exchangeToken}`
    const userResponse = await axios.get(userTokenUrl)
    const userAccessToken =  userResponse.data.access_token

    const pageTokenUrl = `${graphApi}/v3.2/me/accounts?access_token=${userAccessToken}`
    const pageResponse = await axios.get<{data: PageInfo[]}>(pageTokenUrl)

    const pages = pageResponse.data.data
    const page = pages.find(p => p.id === PAGE_ID)
    return page
}