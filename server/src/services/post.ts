import { db } from '../database';
import { uploadFromBuffer } from '../utils/uploadFromBuffer';

interface Post {
  id: number;
  user_id: number;
  caption: string;
  updated_at: string;
  created_at: string;
}

interface PostMedia {
  id: number;
  public_id: number;
  media_type: string;
  media_url: string;
  updated_at: string;
  created_at: string;
}

export const uploadMedia = async (
  media: Express.Multer.File[]
): Promise<any> => {
  const urls = await Promise.all(media.map((m) => uploadFromBuffer(m)));
  return urls;
};

export const createPost = async (
  caption: string,
  userId: number,
  mediaUrls: any
): Promise<{ post: Post; postMedia: PostMedia[] }> => {
  const result = await db.transaction(async (trx) => {
    const post = (
      await trx<Post>('post').insert({ user_id: userId, caption }, '*')
    )[0];

    const postMedia = await trx<PostMedia>('post_media').insert(
      mediaUrls.map((mu: any) => ({
        post_id: post.id,
        media_type: mu.resource_type,
        public_id: mu.public_id,
        media_url: mu.secure_url,
      })),
      '*'
    );

    return { post, postMedia };
  });
  return result;
};
