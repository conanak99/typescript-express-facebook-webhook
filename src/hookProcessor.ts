import { Root, Value, Comment } from "./types"
import { replyToComment, getPostInfoCached as getPostInfo } from "./api/facebook"

import testBots from './bot/testBot'

const bots = [testBots]

export const processHook = async (hook : Root) => {
    // console.log(JSON.stringify(hook, null, 2))

    for (const entry of hook.entry) {
        for (const change of entry.changes) {
            const {item} = change.value
            if (item === 'comment') {
                await processPostComment(change.value)
            }
        }
    }
}

const processPostComment = async (changeValue : Value) => {
    const { comment_id: commentId, from: {name}, message, parent_id, post_id } = changeValue
    if (parent_id !== post_id) {
        console.log(`Comment ${commentId} can not be replied to. Ignore it!`)
        return
    }

    if (!commentId) return
    
    const post = await getPostInfo(post_id)
    for (const processor of bots) {
        const tag = processor.tag
        if (processor.shouldReply(post)) {
            console.log(`Tag found: ${tag}`)

            const comment : Comment = { commentId, name, message }
            const reply = processor.getReply(comment)
            await replyToComment(commentId, reply)
        } else {
            console.log(`Tag ${tag} not found in post`)
        }
    }
}