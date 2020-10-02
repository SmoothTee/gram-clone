import { followerService } from '../services';
import { catchError } from '../utils';

export const suggestions = catchError(async (req, res) => {
  const suggestions = await followerService.suggestions(req.session.userId);

  res.json({ suggestions });
});

export const follow = catchError(async (req, res) => {
  const follower = await followerService.follow(
    req.body.userId,
    req.session.userId
  );

  res.json({ follower });
});

export const unfollow = catchError(async (req, res) => {
  const follower = await followerService.unfollow(
    req.body.userId,
    req.session.userId
  );

  res.json({ follower });
});
