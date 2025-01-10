import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditComment({ loggedInUser }) {
  const { commentId } = useParams();
  const navigate = useNavigate();

  const [comment, setComment] = useState({ subject: "", content: "" });
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the comment data
    fetch(`/api/comments/${commentId}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch comment.");
        }
      })
      .then((data) => {
        // Ensure the logged-in user is the creator
        if (data.userId !== loggedInUser.id) {
          navigate("/comments");
        } else {
          setComment({ subject: data.subject, content: data.content });
        }
      })
      .catch((err) => setError(err.message));
  }, [commentId, loggedInUser.id, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setComment({ ...comment, [name]: value });
  };

  const handleSave = () => {
    fetch(`/api/comments/${commentId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(comment),
    })
      .then((res) => {
        if (res.ok) {
          navigate(`/comments/${commentId}`);
        } else {
          throw new Error("Failed to update comment.");
        }
      })
      .catch((err) => setError(err.message));
  };

  const handleCancel = () => {
    navigate("/comments");
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Edit Comment</h2>
      <form>
        <div>
          <label htmlFor="subject">Subject:</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={comment.subject}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={comment.content}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <button type="button" onClick={handleSave}>
          Save
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
}
