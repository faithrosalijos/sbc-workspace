import React, { useState } from "react";

const NewPost = ({ handleNewPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    handleNewPost(title, content);
    setTitle("");
    setContent("");
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <h2 className="text-white font-semibold text-lg">Create New Post</h2>
      <input
        type="text"
        id="first_name"
        className="border text-gray-900 text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Post Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <textarea
        id="message"
        rows="5"
        className="block resize-none p-2.5 w-full text-sm text-gray-900 rounded-lg border border-gray-300 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
        placeholder="Write your thoughts here..."
        value={content}
        onChange={(event) => setContent(event.target.value)}
        required
      />
      <button
        type="submit"
        className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
      >
        POST
      </button>
    </form>
  );
};

export default NewPost;
