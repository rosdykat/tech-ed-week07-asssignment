-- Here you can copy your SQL query from Supabase 

-- Create tables

CREATE TABLE IF NOT EXISTS sticky_tags (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    tag VARCHAR(255)
);


CREATE TABLE IF NOT EXISTS sticky_posts (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    title VARCHAR(255),
    post TEXT,
    from_user TEXT,
    note_id INT REFERENCES sticky_tags(id)
);

INSERT INTO sticky_tags(tag) VALUES($1) RETURNING id;

-- Add foreign keys

alter TABLE sticky_posts (
ADD note_id INT REFERENCES sticky_tags(tag_id)
);

alter TABLE sticky_tags (
ADD tag_id INT REFERENCES sticky_posts (note_id)
);

-- dummy data insert

-- insert data into tables
INSERT INTO sticky_tags (tag) VALUES ('announcement');


INSERT INTO sticky_posts (title, post, from_user, note_id)
VALUES 
('Hello', 'This is the first post.', 'Rosdykat', 1),
('Test', 'This is a test post.', 'Rosdykat', 1);