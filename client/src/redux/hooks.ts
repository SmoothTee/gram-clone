import { useSelector, TypedUseSelectorHook } from "react-redux";

import { ModalState } from "./modal/types";
import { AuthState } from "./auth/types";
import { PostsState, PostState } from "./post/types";
import { EntityState } from "./entities/types";
import { PostMediaState } from "./postMedia/types";
import { CommentState } from "./comment/types";
import { UserState } from "./user/types";
import { FollowerState, FollowerSuggestionsState } from "./follower/types";

interface RootState {
  modal: ModalState;
  auth: AuthState;
  profileByUsername: { [key: string]: UserState };
  postsByUsername: { [key: string]: PostsState };
  post: PostState;
  postFeed: PostsState;
  postMedia: PostMediaState;
  commentsByPostId: { [key: number]: CommentState };
  follower: FollowerState;
  followerSuggestions: FollowerSuggestionsState;
  entities: EntityState;
  error: any;
}

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
