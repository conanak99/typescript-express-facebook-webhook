import { Bot, PostInfo, Comment, Reply } from "../types";
import { normalize } from "../helper/stringHelper";

abstract class BaseProcessor implements Bot {
    private _tag: string
    private textInclude : string[]

    constructor(tag: string, textInclude : string[] = []) {
        this._tag = tag
        this.textInclude = textInclude
    }

    get tag() {
        return this._tag
    }

    shouldReply(post: PostInfo, comment: Comment) {
        let commentInclude = true
        if (this.textInclude.length > 0) {
            const normalizedMessage = normalize(comment.message)
            commentInclude = this.textInclude.some(text => normalizedMessage.includes(text))
        }

        return post.message.includes(this._tag) && commentInclude
    }
    
    abstract getReply(comment: Comment): Promise<Reply>
}

export default BaseProcessor