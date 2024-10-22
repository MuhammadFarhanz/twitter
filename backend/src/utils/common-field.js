export const userSelectFields = {
  id: true,
  username: true,
  name: true,
  bio: true,
  profile_pic: true,
  is_verified: true,
  _count: true,
};

export const tweetIncludeFields = {
  images: true,
  _count: true,
  likedBy: true,
  bookmarkedBy: true,
  repliedBy: {
    select: userSelectFields,
  },
  author: {
    select: userSelectFields,
  },
};

export const replyIncludeFields = {
  _count: true,
  likedBy: true,
  images: true,
  author: {
    select: userSelectFields,
  },
  parent: {
    include: tweetIncludeFields,
  },
};
