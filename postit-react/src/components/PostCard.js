import React from "react";

const PostCard = ({title, content, user}) => {
  return (
    <div className="p-5 border rounded-lg shadow bg-gray-800 border-gray-700 flex flex-col gap-2">
      <div>
        <h6 className="text-xl font-bold tracking-tight text-white">
          {title}
        </h6>
        <p className="font-normal text-xs text-gray-400">
          by: {user}
        </p>
      </div>
      <p className="font-normal text-gray-400">
        {content}
      </p>
    </div>
  );
};

export default PostCard;
