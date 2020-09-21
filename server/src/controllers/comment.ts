import { commentService } from '../services';
import { catchError } from '../utils';

export const createComment = catchError(async (req, res) => {
  const comment = await commentService.createComment(
    req.body,
    req.session.userId
  );

  res.json({ comment });
});

export const likeComment = catchError(async (req, res) => {
  const commentLike = await commentService.likeComment(
    req.body.commentId,
    req.session.userId
  );

  res.json({ commentLike });
});

export const unlikeComment = catchError(async (req, res) => {
  const commentLike = await commentService.unlikeComment(
    req.body.commentId,
    req.session.userId
  );

  res.json({ commentLike });
});
