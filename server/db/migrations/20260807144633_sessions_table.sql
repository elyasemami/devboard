-- migrate:up

CREATE TABLE sessions (
    id TEXT PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NULL DEFAULT now(),
    expires_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX idx_sessions_users_id ON sessions (user_id);

CREATE INDEX idx_sessions_expires_at ON sessions (expires_at);

-- migrate:down
-- session table
DROP TABLE IF EXISTS sessions;

-- index
DROP INDEX IF EXISTS idx_sessions_users_id;

DROP INDEX IF EXISTS idx_sessions_expires_at;