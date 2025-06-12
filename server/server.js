// Imports
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";
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

  const tag = await db.query(
    `INSERT INTO sticky_tags (tag) VALUES ($1) RETURNING id`,
    [body.tag]
  );

  const query = await db.query(
    `INSERT INTO sticky_posts (title, post, from_user, note_id)
    VALUES ($1, $2, $3, $4)`,
    [body.title, body.post, body.from_user, body.note_id]
  );
  response.json(query);
});

// app.post("/add_tags", async (request, response) => {
//   const body = await request.body;
//   const query = await db.query(
//     `INSERT INTO sticky_tags (tag)
//     VALUES ($1,)`,
//     [body.tag]
//   );
//   response.json(query);
// });
// ======================================

// ? STRETCH: I want to DELETE data

// ? STRETCH: I want to UPDATE data
