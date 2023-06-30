import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [image_url, setImageUrl] = useState(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    const addData = { title, description, content, image_url, category, password }

    const response = await fetch("http://localhost:5000", {
      method: "POST",
      body: JSON.stringify(addData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      setTitle("")
      setDescription("")
      setPassword("")
      setImageUrl("")
      setContent("")
      setCategory("")
    }
  }

  return (
    <>
      {error && <div class="alert alert-danger"> {error} </div>}
      <div className="add">
        <div className="content">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Password to save article"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter image url"
            value={image_url}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={content}
              onChange={setContent}
            />
          </div>
        </div>
        <div className="menu">

          <div className="item">
            <h1>Category</h1>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                value="technology"
                id="technology"
                onChange={handleCategoryChange}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                value="education"
                id="education"
                onChange={handleCategoryChange}
              />
              <label htmlFor="education">Education</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                name="cat"
                value="health"
                id="health"
                onChange={handleCategoryChange}
              />
              <label htmlFor="health">Health</label>
            </div>
          </div>
        </div>
      </div>
      <button className="save" onClick={handleSubmit}>
        SAVE
      </button>
    </>
  );
};

export default Write;
