// Imports
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
import e from "express";
// Configs
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());
// Port
app.listen(8080, function () {
  console.log("Server is alive and listening on 8080");
});
// Root route
app.get("/", function (request, response) {
  response.json({ message: "This is the root route of the API." });
});

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});
// ======================================

// TODO: I want to READ data
app.get("/get_posts", async (request, response) => {
  const query = await db.query(`SELECT * FROM sticky_posts`);
  response.json(query.rows);
});

app.get("/get_tags", async (request, response) => {
  const query = await db.query(`SELECT * FROM sticky_tags`);
  response.json(query.rows);
});

// TODO: I want to CREATE new data

app.post("/add_posts", async (request, response) => {
  const body = await request.body;

  // Selects the id from tags
  try {
    const existingTag = await db.query(
      // select id from sticky tags where the tag = whatever tag was submitted
      `SELECT id FROM sticky_tags WHERE tag = $1`,
      [body.tag]
    );
    // creates variable named tagId - given a value below
    let tagId;

    //This part checks if the tag already exists, and if so it assigns the tagId with its value
    if (existingTag.rows.length > 0) {
      tagId = existingTag.rows[0].id;
    } else {
      // the else is triggered if the tag does not already exist, and therefore creates a new one and returns its ID
      const tag = await db.query(
        `INSERT INTO sticky_tags(tag) VALUES($1) RETURNING id;`,

        [body.tag]
      );
      tagId = tag.rows[0].id;
    }
    // adding the form results to the sticky posts table, including the tag ID which will either be a new tag, or an existing tag through the try/if statement
    const query = await db.query(
      `INSERT INTO sticky_posts (title, post, from_user, note_id)
    VALUES ($1, $2, $3, $4)`,
      [body.title, body.post, body.from_user, tagId]
    );
    // error handling
    response.status(201).json(query.rows[0]);
  } catch (error) {
    console.error("Error!!", error);
    response.status(500).json({ error: "Server error" });
  }
});

// ======================================

// ? STRETCH: I want to DELETE data

// ? STRETCH: I want to UPDATE data
