import React, { FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { createCommentAction } from "../../redux/comment/actions";

import styles from "./CommentForm.module.css";

interface CommentFormProps {
  postId: number;
}

export const CommentForm = ({ postId }: CommentFormProps) => {
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    dispatch(createCommentAction(postId, text, () => setText("")));
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        className={styles.input}
        placeholder="Add a comment..."
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      <button
        disabled={text.trim().length === 0}
        type="submit"
        className={styles.button}
      >
        Post
      </button>
    </form>
  );
};
