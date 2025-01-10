import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addPost } from "../../managers/postManager";
import { UserContext } from "../ApplicationViews";
import { useContext } from "react";

export const CreatePost = () => {
  const { loggedInUser } = useContext(UserContext);
  const [post, setPost] = useState({
    userProfileId: "",
    title: "",
    subtitle: "",
    categoryId: 0,
    headerImageUrl: "",
    body: "",
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  // Fetch categories when the component loads
  useEffect(() => {
    fetch("/api/Category")
      .then((res) => res.json())
      .then(setCategories)
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    const postCopy = { ...post };
    postCopy.userProfileId = loggedInUser?.id;
    setPost(postCopy);
  }, [loggedInUser]);
  
  const handleSave = (event) => {
    event.preventDefault();

    // Validate form data
    if (
      !post.title ||
      !post.subtitle ||
      !post.categoryId ||
      !post.body
    ) {
      window.alert("Please fill out all fields before submitting.");
      return;
    }

    // Call addPost to save the new post
    addPost(post)
      .then(() => {
        navigate("/myposts"); 
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        window.alert("An error occurred while creating the post.");
      });
  };

  return (
    <form>
      {/* Title Field */}
      <fieldset>
        <div className="holder">
          <label className="font">Title</label>
          <input
            className="font-two"
            type="text"
            placeholder="Enter post title"
            onChange={(event) => {
              const postCopy = { ...post };
              postCopy.title = event.target.value;
              setPost(postCopy);
            }}
            value={post.title}
          />
        </div>
      </fieldset>

      {/* Subtitle Field */}
      <fieldset>
        <div className="holder">
          <label className="font">Subtitle</label>
          <input
            className="font-two"
            type="text"
            placeholder="Enter post subtitle"
            onChange={(event) => {
              const postCopy = { ...post };
              postCopy.subtitle = event.target.value;
              setPost(postCopy);
            }}
            value={post.subtitle}
          />
        </div>
      </fieldset>

      {/* Category Dropdown */}
      <fieldset>
        <div className="holder">
          <label className="font">Category</label>
          <select
            className="font-two"
            onChange={(event) => {
              const postCopy = { ...post };
              postCopy.categoryId = parseInt(event.target.value);
              setPost(postCopy);
            }}
            value={post.categoryId}
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      {/* Header Image Field */}
      <fieldset>
        <div className="holder">
          <label className="font">Header Image URL</label>
          <input
            className="font-two"
            type="text"
            placeholder="Paste header image URL"
            onChange={(event) => {
              const postCopy = { ...post };
              postCopy.headerImageUrl = event.target.value;
              setPost(postCopy);
            }}
            value={post.headerImageUrl}
          />
        </div>
      </fieldset>

      {/* Body Field */}
      <fieldset>
        <div className="holder">
          <label className="font">Body</label>
          <textarea
            className="font-two"
            placeholder="Write your post body here"
            onChange={(event) => {
              const postCopy = { ...post };
              postCopy.body = event.target.value;
              setPost(postCopy);
            }}
            value={post.body}
          />
        </div>
      </fieldset>

      {/* Submit Button */}
      <fieldset>
        <div className="btn-holder">
          <button className="btn" onClick={handleSave}>
            Create Post
          </button>
        </div>
      </fieldset>
    </form>
  );
};

