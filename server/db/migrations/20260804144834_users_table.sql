-- migrate:up
CREATE TYPE projects_status as ENUM ('active', 'inactive', 'completed', 'cancelled');

CREATE TYPE user_status as ENUM ('available', 'busy', 'scheduled');

CREATE TYPE tasks_status as ENUM ('assigned', 'waiting', 'completed');

CREATE TYPE roles as ENUM ('owner', 'assignee');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_At TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    user_id UUID NOT NULL UNIQUE REFERENCES users (id) ON DELETE CASCADE,
    user_role roles NOT NULL DEFAULT 'owner',
    avatar_url TEXT,
    bio TEXT,
    phone TEXT,
    user_availability user_status NOT NULL DEFAULT 'available',
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    description TEXT,
    project_status projects_status NOT NULL DEFAULT 'active',
    current_owner_id UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    created_by UUID NOT NULL REFERENCES users ON DELETE RESTRICT,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    project_id UUID NOT NULL REFERENCES projects (id) ON DELETE CASCADE,
    task_created_by UUID NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    task_assigned_member UUID NOT NULL REFERENCES users (id) ON DELETE RESTRICT,
    task_title TEXT NOT NULL,
    task_desc TEXT NOT NULL,
    task_due_date TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP
    WITH
        TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- migrate:down
-- Drop tables
DROP TABLE IF EXISTS projects;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS user_profiles;

DROP TABLE IF EXISTS tasks;

-- Drop enum types
DROP TYPE IF EXISTS roles;

DROP TYPE IF EXISTS project_status;

DROP TYPE IF EXISTS user_status;

DROP TYPE IF EXISTS tasks_status;