import React from "react";
import FollowButton from "./follow-button";
import EditProfileButton from "./edit-button";

const ProfileAvatarWithFollowButton = ({
  user,
  isError,
  isCurrentUser,
  isFollowing,
  handleFollowToggle,
}: any) => {
  return (
    <div className="relative pl-4 p-2 sm:h-20 h-14">
      <button
        className="absolute -mt-0 sm:-mt-3 aspect-square w-24 -translate-y-1/2 overflow-hidden p-0 disabled:cursor-auto disabled:opacity-100 xs:w-32 sm:w-36 hover:brightness-90"
        type="button"
      >
        <div className="h-full rounded-full bg-main-background p-1">
          <div
            style={{ backgroundImage: `url(${user?.profile_pic})` }}
            className="h-full rounded-full bg-main-sidebar-background bg-center bg-cover"
          ></div>
        </div>
      </button>

      {!isError && user && (
        <div className="absolute right-1">
          {!isCurrentUser ? (
            <FollowButton
              id={user?.id}
              onFollowToggle={handleFollowToggle}
              isFollowing={isFollowing}
            />
          ) : (
            <EditProfileButton />
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileAvatarWithFollowButton;
