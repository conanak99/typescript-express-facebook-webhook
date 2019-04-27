import { Bot, PostInfo, Comment, Reply } from "../types";
import { normalize } from "../helper/stringHelper";

abstract class BaseProcessor implements Bot {
    private _tag: string
    private textToInclude : string[]

    constructor(tag: string, textToInclude : string[] = []) {
        this._tag = tag
        this.textToInclude = textToInclude
    }

    get tag() {
        return this._tag
    }

    shouldReply(post: PostInfo, comment: Comment) {
        // Weird facebook bug T_T, sometimes this is undefined
        if (!comment.message) return false

        let commentInclude = true
        if (this.textToInclude.length > 0) {
            const normalizedMessage = normalize(comment.message)
            commentInclude = this.textToInclude.some(text => normalizedMessage.includes(text))
        }

        return post.message.includes(this._tag) && commentInclude
    }
    
    abstract getReply(comment: Comment): Promise<Reply>
}

export default BaseProcessor