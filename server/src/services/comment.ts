import { db } from '../database';
import { AppError } from '../utils';

export interface PostComment {
  parent_id?: number;
  id: number;
  post_id: number;
  user_id: number;
  text: string;
  created_at: string;
  updated_at: string;
}

export interface CommentLike {
  comment_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export const createComment = async (
  body: { post_id: number; text: string },
  user_id: number
): Promise<PostComment> => {
  const comment = (
    await db<PostComment>('comment').insert(
      {
        post_id: body.post_id,
        user_id,
        text: body.text,
      },
      '*'
    )
  )[0];

  return comment;
};

export const likeComment = async (
  comment_id: number,
  user_id: number
): Promise<CommentLike> => {
  try {
    const commentLike = (
      await db<CommentLike>('comment_like').insert({ comment_id, user_id }, '*')
    )[0];
    return commentLike;
  } catch (err) {
    if (err.code === '23505') {
      throw new AppError(409, 'You have already liked the comment.');
    } else {
      throw err;
    }
  }
};

export const unlikeComment = async (
  comment_id: number,
  user_id: number
): Promise<CommentLike> => {
  const commentLike = (
    await db<CommentLike>('comment_like')
      .del()
      .where({ comment_id, user_id })
      .returning('*')
  )[0];

  if (!commentLike) {
    throw new AppError(404, 'You have not liked the comment.');
  }

  return commentLike;
};
