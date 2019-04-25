import { Root, Value, Comment } from "./types"
import { replyToComment } from "./facebookApi"

const postId = '1093212670720847_2645737418801690'

const commentIds = new Set<string>()

export const processHook = async (hook : Root) => {
    for (const entry of hook.entry) {
        for (const change of entry.changes) {
            const {item, post_id} = change.value
            if(post_id === postId && item === 'comment') {
                await processPostComment(change.value)
            }
        }
    }
}

const processPostComment = async (changeValue : Value) => {
    const { comment_id: commentId, from: {name}, message, parent_id } = changeValue
    if (commentId) {
        const comment : Comment = { commentId, name, message }
        console.log({ comment })

        commentIds.add(commentId)
        if (parent_id && commentIds.has(parent_id)) {
            console.log(`Comment ${commentId} can not be replied to. Ignore it!`)
        } else {
            await replyToComment(comment)
        }
    }
}