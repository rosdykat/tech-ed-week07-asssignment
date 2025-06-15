import { useEffect, useState } from "react";
import "./StickyNote.css";

export default function StickyNote() {
  const [formData, setFormData] = useState({ posts: [], tags: [] });

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("https://tech-ed-week07-asssignment2.onrender.com/get_posts");
      const data = await response.json();
      // Organising the data by the value of it's ID to be displayed in the correct order.
      const orderedNotes = data.sort((postA, postB) => postB.id - postA.id);

      const tagResponse = await fetch("https://tech-ed-week07-asssignment2.onrender.com/get_tags");
      const tagData = await tagResponse.json();
      // Recieving the data from both get posts and get tags
      //   console.log(tagData);
      //   console.log(data);
      setFormData({
        posts: orderedNotes,
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
            <div className="titleContainer">
            <h1>{post.title}</h1>
            </div>
            <div className="postContainer">
            <p>{post.post}</p>
            <div className="userContainer">
            <h2><u>{post.from_user}</u></h2>
            </div>
            </div>
            <div className="tagContainer">
            <h2>{tag.tag}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}
