import tweetService from "../services/tweet-service.js";

const create = async (req, res, next) => {
  try {
    const id = req.user.id;

    const request = req.body;
    request.authorId = id;

    const result = await tweetService.create(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await tweetService.getAll();

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await tweetService.getById(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
  getAll,
  getById,
};
