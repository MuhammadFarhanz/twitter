import tweetService from "../services/tweet-service.js";
import { uploadImageToS3 } from "../utils/upload-s3.js";

const create = async (req, res, next) => {
  try {
    const id = req.user.id;
    const files = req.files;

    console.log(files);
    let imageUrls = [];

    if (files) {
      imageUrls = await uploadImageToS3(files);
    }

    const request = req.body;
    request.authorId = id;

    if (imageUrls) {
      request.images = imageUrls;
    }

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

const getBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const result = await userService.getBookmark(userId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const timeline = async (req, res, next) => {
  try {
    const { take, lastCursor } = req?.query;
    const result = await tweetService.timeline(take, lastCursor);

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
  getBookmark,
  timeline,
};
