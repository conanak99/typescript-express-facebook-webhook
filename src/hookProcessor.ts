import { Root, Value, Comment, PostInfo } from "./types"
import { replyToComment, getPostInfoCached as getPostInfo } from "./facebookApi"

import testProcessors from './processors/testProcessor'

const processors = [testProcessors]

export const processHook = async (hook : Root) => {
    // console.log(JSON.stringify(hook, null, 2))

    for (const entry of hook.entry) {
        for (const change of entry.changes) {
            const {item} = change.value
            if(item === 'comment') {
                await processPostComment(change.value)
            }
        }
    }
}

const shouldReply = (post: PostInfo) : boolean => {
    const tags = ['#tuvi-autobot', '#girl-autobot']
    return tags.some(tag => post.message.includes(tag))
}

const processPostComment = async (changeValue : Value) => {
    const { comment_id: commentId, from: {name}, message, parent_id, post_id } = changeValue
    if (commentId) {
        const comment : Comment = { commentId, name, message }

        if (parent_id !== post_id) {
            console.log(`Comment ${commentId} can not be replied to. Ignore it!`)
        } else {
            const post = await getPostInfo(post_id)
            for (const processor of processors) {
                const tag = processor.tag
                if (processor.shouldReply(post)) {
                    console.log(`Tag found: ${tag}`)
                    const reply = processor.getReply(comment)
                    await replyToComment(commentId, reply)
                } else {
                    console.log(`Tag ${tag} not found in post`)
                }
            }
        }
    }
}