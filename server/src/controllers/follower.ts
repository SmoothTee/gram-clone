import { followerService } from '../services';
import { catchError } from '../utils';

export const suggestions = catchError(async (req, res) => {
  const suggestions = await followerService.suggestions(req.session.userId);

  res.json({ suggestions });
});
