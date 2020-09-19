import { commentService } from '../services';
import { catchError } from '../utils';

export const createComment = catchError(async (req, res) => {
  const comment = await commentService.createComment(
    req.body,
    req.session.userId
  );

  res.json({ comment });
});
