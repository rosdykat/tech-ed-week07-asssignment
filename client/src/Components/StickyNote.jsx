import { useEffect, useState } from "react";
import "./StickyNote.css";

export default function StickyNote() {
  const [formData, setFormData] = useState({ posts: [], tags: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/get_posts");
      const data = await response.json();

      const tagResponse = await fetch("http://localhost:8080/get_tags");
      const tagData = await tagResponse.json();
      // Recieving the data from both get posts and get tags
      //   console.log(tagData);
      //   console.log(data);
      setFormData({
        posts: data,
        tags: tagData,
      });
    }
    fetchData();
  }, []);

  return (
    <div className="stickyNoteContainer">
      {formData.posts.map((post) => {
        // Find the tag in get_tags id that matches the post.note_id in get_posts
        const tag = formData.tags.find((tag) => tag.id === post.note_id);

        return (
          <div className="stickies" key={post.id}>
            <h1>{post.title}</h1>
            <p>{post.post}</p>
            {post.from_user}
            <p>{tag.tag}</p>
          </div>
        );
      })}
    </div>
  );
}
