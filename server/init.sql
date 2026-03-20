-- Run this once to create the projects table
CREATE TABLE IF NOT EXISTS projects (
  id          SERIAL PRIMARY KEY,
  title       VARCHAR(255) NOT NULL,
  description TEXT         NOT NULL,
  image_url   TEXT         NOT NULL,
  github_url  TEXT         NOT NULL,
  category    VARCHAR(20)  NOT NULL CHECK (category IN ('personal', 'academic')),
  created_at  TIMESTAMP    DEFAULT NOW()
);
