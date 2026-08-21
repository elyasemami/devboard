-- migrate:up
CREATE TABLE agents
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    model_info VARCHAR(100) NOT NULL
);

CREATE TABLE agents_schedule(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agents_id UUID NOT NULL UNIQUE REFERENCES agents(id),
    current_task TEXT,
    next_scheduled_task TEXT,
    completed_tasks TEXT
);


ALTER TABLE projects DROP COLUMN current_owner_id;
ALTER TABLE projects ADD COLUMN assigned_agent_name TEXT;
ALTER TABLE projects ADD COLUMN due_date Date;

-- migrate:down

