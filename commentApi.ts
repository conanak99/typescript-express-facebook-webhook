import axios from 'axios'

const graphApi = 'https://graph.facebook.com'
const accessToken = process.env.ACCESS_TOKEN 

export const autoReply = async (commentId: string) => {
    const fullUrl = `${graphApi}/v3.2/${commentId}/comments?access_token=${accessToken}`

    try {
        const data = {
            message: 'Hello From Code Bot',
            attachment_url: 'https://scontent.fsin2-1.fna.fbcdn.net/v/t1.0-9/58691874_226367711657494_3162037494061465600_n.jpg?_nc_cat=101&_nc_oc=AQnDZHcic2tpVxV0RO0CtNawrLf7pwcywH-XSaDO1ez3uusV5C7LJtAVCQO25vmcwdtjS1MNp3fcBKJWjZ7_GTnj&_nc_ht=scontent.fsin2-1.fna&oh=a9ec110e134516ecd83894d35f6f8ada&oe=5D2CBDB9'
        }
        console.log('start replying to ' + commentId)
        const response = await axios.post<{ id: string }>(fullUrl, data)
        console.log('result', response.data)
        console.log('finished replying to ' + commentId)
        return response.data
    } catch (err) {
        const error = err.response.data
        console.error(error)
    }

    return false
}