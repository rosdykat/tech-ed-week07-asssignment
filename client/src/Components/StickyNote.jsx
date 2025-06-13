import { useEffect, useState } from "react";
import "./StickyNote.css";

export default function StickyNote() {
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/get_posts");
      const data = await response.json();
      console.log(data);
      setFormData(data);
    }
    fetchData();
  }, []);

  return (
    <div className="stickyNoteContainer">
      {formData.map((item) => (
        <li className="stickies" key={item.id}>
          <h1>{item.title}</h1> <p>{item.post}</p> {item.from_user} {item.tag}
        </li>
      ))}
    </div>
  );
}
