import { db } from '../database';

export interface PostComment {
  parent_id?: number;
  id: number;
  post_id: number;
  user_id: number;
  text: string;
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
