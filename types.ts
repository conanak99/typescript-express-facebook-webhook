export interface Root {
    entry: Entry[];
    object: string;
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