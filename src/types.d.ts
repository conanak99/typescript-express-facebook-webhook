export interface Root {
    entry: Entry[];
    object: string;
}

export interface PageInfo {
    access_token: string
    category: string
    name: string
    id: string
}

export interface Entry {
    changes: Change[];
    id: string;
    time: number;
}

export interface Change {
    field: string;
    value: Value;
}

export interface Value {
    from: From;
    item: string;
    comment_id?: string;
    reaction_type?: string;
    post_id: string;
    verb: string;
    parent_id?: string;
    created_time: number;
    post?: Post;
    message: string;
}

export interface From {
    id: string;
    name: string;
}

export interface Post {
    type: string;
    updated_time: string;
    promotion_status: string;
    permalink_url: string;
    id: string;
    status_type: string;
    is_published: boolean;
}

export interface Comment {
    commentId: string
    userId: string
    name: string
    message: string
}

export interface PostInfo {
    created_time: string
    message: string
    id: string
}

export interface ResponseData<T> {
    data: T
}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
          ACCESS_TOKEN: string
          APP_ID: string
          APP_SECRET: string
          PAGE_ID: string
          TUMBLR_API_KEY?: string
        }
      }
}

export interface Reply {
    message: string, imageUrl?: string
}

export interface Bot {
    tag : string
    shouldReply(post: PostInfo, comment: Comment) : boolean
    getReply(comment: Comment): Promise<Reply>
}