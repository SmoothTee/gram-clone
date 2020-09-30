import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { readPostAction } from "../../../../redux/post/actions";
import { PostPanorama } from "../../../PostPanorama";
import { RootModal } from "../RootModal";

interface PostModalProps {
  postId: number;
}

export const PostModal = ({ postId }: PostModalProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(readPostAction(postId));
  }, []);

  return (
    <RootModal blank={true}>
      <PostPanorama postId={postId} />
    </RootModal>
  );
};
