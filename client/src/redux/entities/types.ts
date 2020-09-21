import { User } from "../auth/types";
import { Post, PostMedia } from "../post/types";
import { PostComment } from "../comment/types";

export interface EntityInitialState<T> {
  byId: { [key: number]: T };
}

export interface EntityState {
  users: EntityInitialState<User>;
  posts: EntityInitialState<Post>;
  postMedia: EntityInitialState<PostMedia>;
  comments: EntityInitialState<PostComment>;
}
