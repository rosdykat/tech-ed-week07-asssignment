// This form will send users input to the server CREATE route
import { useState } from "react";
import "./Form.css";

export default function Form() {
  // State to store data
  const [formData, setFormData] = useState({
    title: "",
    post: "",
    from_user: "",
    tag: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    fetch("http://localhost:8080/add_posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      setFormData({
        title: "",
        post: "",
        from_user: "",
        tag: "",
      });
    });
  }

  return (
    <div className="submitForm">
      <h1>Form</h1>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>The form</legend>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            className="title"
            required
            placeholder="title"
            value={formData.title}
            onChange={handleChange}
          />
          <label htmlFor="post">Post:</label>
          <input
            type="text"
            name="post"
            className="post"
            required
            placeholder="post"
            value={formData.post}
            onChange={handleChange}
          />
          <label htmlFor="from_user">Username:</label>
          <input
            type="text"
            name="from_user"
            className="from_user"
            required
            placeholder="Username"
            value={formData.from_user}
            onChange={handleChange}
          />
          <label htmlFor="tag">Tag</label>
          <input
            type="text"
            name="tag"
            className="tag"
            required
            placeholder="Tag"
            value={formData.tag}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
      {/* Set up an accessible form with semantic tags */}
      {/* Remember to track the input changes (value) */}
    </div>
  );
}
