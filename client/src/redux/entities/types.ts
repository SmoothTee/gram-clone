import { User } from "../auth/types";
import { Post, PostComment, PostMedia } from "../post/types";

export interface EntityInitialState<T> {
  byId: { [key: number]: T };
}

export interface EntityState {
  users: EntityInitialState<User>;
  posts: EntityInitialState<Post>;
  postMedia: EntityInitialState<PostMedia>;
  comments: EntityInitialState<PostComment>;
}
