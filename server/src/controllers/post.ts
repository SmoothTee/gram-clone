import { postService } from '../services';
import { catchError } from '../utils';

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

export const readPosts = catchError(async (req, res) => {
  const result = await postService.readPosts();

  res.json(result);
});
