import { Bot, PostInfo, Comment, Reply } from "../types";

abstract class BaseProcessor implements Bot {
    private _tag: string

    constructor(tag: string) {
        this._tag = tag
    }

    get tag() {
        return this._tag
    }

    shouldReply(post: PostInfo, comment: Comment) {
        return post.message.includes(this._tag)
    }
    
    abstract getReply(comment: Comment): Promise<Reply>
}

export default BaseProcessor