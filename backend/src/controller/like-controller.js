import likeService from "../services/like-service.js";

const create = async (req, res, next) => {
  try {
    const id = req.user.id;

    const request = req.body;
    request.userId = id;

    const result = await likeService.create(request);

    res.status(200).json({
      data: {
        result,
      },
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};
