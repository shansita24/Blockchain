-- Drop the table if it already exists
DROP TABLE IF EXISTS candidates;

-- Create the candidates table
CREATE TABLE candidates (
    id SERIAL PRIMARY KEY,      -- Auto-incrementing ID
    name VARCHAR(255) UNIQUE NOT NULL, -- Candidate name (must be unique)
    vote_count INT DEFAULT 0    -- Number of votes (default is 0)
);
