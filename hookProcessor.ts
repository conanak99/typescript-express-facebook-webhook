import { Root, Value } from "./types";
import { autoReply } from "./commentApi";

const postId = '1093212670720847_2645737418801690'

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
    const { comment_id } = changeValue
    if (comment_id) {
        await autoReply(comment_id)
    }
}