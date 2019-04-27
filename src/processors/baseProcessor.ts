import { Processor, PostInfo, Comment, Reply } from "../types";

abstract class BaseProcessor implements Processor {
    private _tag: string

    constructor(tag: string) {
        this._tag = tag
    }

    get tag(): string {
        return this._tag
    }

    shouldReply(post: PostInfo): boolean {
        return post.message.includes(this._tag)
    }    
    
    abstract getReply(comment: Comment): Reply
}

export default BaseProcessor