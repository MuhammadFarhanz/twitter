import userService from "../services/user-service.js";
import { uploadImageToS3 } from "../utils/upload-s3.js";

const register = async (req, res, next) => {
  try {
    const result = await userService.register(req.body);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await userService.login(req.body, res);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const get = async (req, res, next) => {
  try {
    const id = req.user.id;

    const result = await userService.get(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getByUsername = async (req, res, next) => {
  try {
    const { username } = req.params;

    const result = await userService.getByUsername(username);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const update = async (req, res, next) => {
  try {
    const id = req.user.id;
    const profile_pic = req.files;

    let profilePicUrl = [];

    if (profile_pic.length > 0) {
      profilePicUrl = await uploadImageToS3(profile_pic);
    } else {
      profilePicUrl = ["/assets/default_profile_400x400.png"];
    }

    const request = req.body;
    request.id = id;
    request.profile_pic = profilePicUrl[0];

    const result = await userService.update(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const logout = async (req, res, next) => {
  try {
    const result = await userService.logout(req.user.id, res);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const follow = async (req, res, next) => {
  try {
    const id = req.user.id;
    const userIdToFollow = req.params.id;

    const request = req.body;
    request.userId = id;
    request.userIdToFollow = userIdToFollow;

    console.log(request);

    const result = await userService.follow(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const bookmark = async (req, res, next) => {
  try {
    const request = req.body;
    request.userId = req.user.id;

    const result = await userService.bookmarks(request);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getBookmark = async (req, res, next) => {
  try {
    const userId = req?.user.id;

    const result = await userService.getBookmark(userId);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

const getFollowSuggestion = async (req, res, next) => {
  try {
    const id = req.user.id;

    const result = await userService.getFollowSuggestion(id);

    res.status(200).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  register,
  login,
  get,
  getByUsername,
  update,
  logout,
  follow,
  bookmark,
  getBookmark,
  getFollowSuggestion,
};
