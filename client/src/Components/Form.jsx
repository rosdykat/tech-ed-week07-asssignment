// This form will send users input to the server CREATE route
import { useState } from "react";
import "./Form.css";

export default function Form() {
  // State to store data
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [from_user, setFrom_user] = useState("");
  const [tag, setTag] = useState("");
  // const [note_id, setNote_id] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    fetch("http://localhost:8080/add_posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        post,
        from_user,
        tag,
      }),
    });
  }
  // Submit listener and handler
  function handleTitle(event) {
    setTitle(event.target.value);
    console.log(title);
  }
  function handlePost(event) {
    setPost(event.target.value);
    console.log(post);
  }
  function handleFrom_user(event) {
    setFrom_user(event.target.value);
    console.log(from_user);
  }
  function handleTag(event) {
    setTag(event.target.value);
  }

  // Change listener and handler

  // ! Example =======================
  //     function handleSubmit(event){
  // event.preventDefault()
  // // Collect data nd update state

  // //fetch the server route
  // fetch("serverEndpoint",{
  //     headers:,
  //     body:,
  // })
  //     }
  // ! Example =======================
  return (
    <div className="submitForm">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>The form</legend>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            className="title"
            required
            placeholder="title"
            value={title}
            onChange={handleTitle}
          />
          <label htmlFor="post">Post:</label>
          <input
            type="text"
            className="post"
            required
            placeholder="post"
            value={post}
            onChange={handlePost}
          />
          <label htmlFor="from_user">Username:</label>
          <input
            type="text"
            className="from_user"
            required
            placeholder="Username"
            value={from_user}
            onChange={handleFrom_user}
          />
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            className="tag"
            required
            placeholder="Tag"
            value={tag}
            onChange={handleTag}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      {/* Set up an accessible form with semantic tags */}
      {/* Remember to track the input changes (value) */}
    </div>
  );
}
