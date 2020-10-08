import { followerService } from '../services';
import { catchError } from '../utils';

export const readSuggestions = catchError(async (req, res) => {
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

export const readFollowers = catchError(async (req, res) => {
  const result = await followerService.readFollowers(
    Number(req.params.user_id)
  );

  res.json(result);
});

export const readFollowings = catchError(async (req, res) => {
  const result = await followerService.readFollowings(
    Number(req.params.follower_id)
  );

  res.json(result);
});
