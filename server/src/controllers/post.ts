import { postService } from '../services';
import { AppError, catchError } from '../utils';

export const createPost = catchError(async (req, res) => {
  const media_urls = await postService.uploadMedia(
    req.files as Express.Multer.File[]
  );

  const result = await postService.createPost(
    req.body.caption,
    req.session.userId,
    media_urls
  );

  res.json(result);
});

export const readPosts = catchError(async (_req, res) => {
  const result = await postService.readPosts();

  res.json(result);
});

export const likePost = catchError(async (req, res) => {
  const like = await postService.likePost(req.body.postId, req.session.userId);

  res.json({ like });
});

export const unlikePost = catchError(async (req, res) => {
  const like = await postService.unlikePost(
    req.body.postId,
    req.session.userId
  );

  if (!like) {
    throw new AppError(404, 'You have not liked the post.');
  }

  res.json({ like });
});