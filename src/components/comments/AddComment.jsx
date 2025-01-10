import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function AddComment() {
  const { postId } = useParams(); // Assumes the post ID is passed in the route
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      postId: parseInt(postId), // Ensure this is an integer
      subject,
      content,
    };

    try {
      const response = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newComment),
      });

      if (!response.ok) {
        throw new Error("Failed to save the comment. Please try again.");
      }

      // Redirect to the comments list page for the post
      navigate(`/posts/${postId}/comments`);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <h2>Add a New Comment</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save</button>
        <button type="button" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default AddComment;
