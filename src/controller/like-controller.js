import likeService from "../services/like-service.js";

const likeTweet = async (req, res) => {
  try {
    const id = req.user.id;

    const request = req.body;
    request.userId = id;

    const result = likeService.likeTweet(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const unlikeTweet = async (req, res) => {
  try {
    const id = req.user.id;

    const request = req.body;
    request.userId = id;

    const result = likeService.unlikeTweet(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  likeTweet,
  unlikeTweet,
};
