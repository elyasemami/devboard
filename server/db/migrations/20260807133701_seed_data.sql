-- migrate:up

-- 1. Create the Users
WITH
    inserted_users AS (
        INSERT INTO
            users (
                full_name,
                email,
                password_hash
            )
        VALUES (
                'john One',
                'john@devboard.com',
                'HASH1'
            ),
            (
                'marry Two',
                'marry@devboard.com',
                'HASH2'
            ),
            (
                'hossein Three',
                'hossein@devboard.com',
                'HASH3'
            ),
            (
                'gol Four',
                'gol@devboard.com',
                'HASH4'
            ),
            (
                'khosro Five',
                'khosro@devboard.com',
                'HASH5'
            ),
            (
                'begum Six',
                'begum@devboard.com',
                'HASH6'
            ) RETURNING id,
            email
    ),

-- 2. Create the Profiles linked to those Users
inserted_user_profiles AS (
    INSERT INTO
        user_profiles (
            user_id,
            avatar_url,
            bio,
            phone,
            user_availability
        )
    SELECT
        id,
        'https://google.com' AS avatar_url,
        CASE
            WHEN email LIKE 'begum%'
            OR email LIKE 'marry%' THEN 'CEO of fortune 500 company'
            WHEN email LIKE 'gol%'
            OR email LIKE 'hossein%' THEN 'Product manager for startups'
            ELSE 'UX Designer'
        END AS bio,
        CASE
            WHEN email LIKE 'begum%'
            OR email LIKE 'marry%' THEN '12345567890'
            WHEN email LIKE 'gol%'
            OR email LIKE 'hossein%' THEN '1234567098'
            ELSE '0987633432'
        END AS phone,
        CASE
            WHEN email LIKE 'begum%'
            OR email LIKE 'marry%' THEN 'available'
            WHEN email LIKE 'gol%'
            OR email LIKE 'hossein%' THEN 'busy'
            ELSE 'busy'
        END ::user_status AS user_availability
    FROM inserted_users
),

-- 3. Extract separate user IDs to assign distinct creators/owners
user_pool AS (
    SELECT 
        MAX(CASE WHEN email LIKE 'john%' THEN id::text END)::uuid AS john_id,
        MAX(CASE WHEN email LIKE 'marry%' THEN id::text END)::uuid AS marry_id,
        MAX(CASE WHEN email LIKE 'hossein%' THEN id::text END)::uuid AS hossein_id,
        MAX(CASE WHEN email LIKE 'gol%' THEN id::text END)::uuid AS gol_id,
        MAX(CASE WHEN email LIKE 'khosro%' THEN id::text END)::uuid AS khosro_id,
        MAX(CASE WHEN email LIKE 'begum%' THEN id::text END)::uuid AS begum_id
    FROM inserted_users
),

-- 4. Create the Projects using the extracted User IDs
inserted_projects AS (
    INSERT INTO projects ( name, description, project_status, current_owner_id, created_by )
    SELECT p_data.name, p_data.description, p_data.project_status::projects_status, p_data.owner_id, p_data.creator_id
    FROM user_pool up
    CROSS JOIN LATERAL (
        VALUES 
            ( 'Core Platform Migration', 'Upgrading the core legacy database infrastructure to microservices.', 'active', up.marry_id, up.john_id ),
            ( 'Executive Analytics Dashboard', 'Reporting application for fortune 500 portfolio management dashboards.', 'active', up.begum_id, up.hossein_id ),
            ( 'Mobile Startup MVP', 'Building out a fast prototyping template for upcoming product releases.', 'active', up.gol_id, up.khosro_id )
    ) AS p_data(name, description, project_status, owner_id, creator_id)
    RETURNING id, name
)

-- 5. Create the Tasks using both Project IDs and User IDs
INSERT INTO tasks ( project_id, task_created_by, task_assigned_member, task_title, task_desc, task_due_date )
SELECT 
    ip.id AS project_id,
    -- Evaluate task creators dynamically based on the project context
    CASE 
        WHEN ip.name = 'Core Platform Migration' THEN up.john_id
        WHEN ip.name = 'Executive Analytics Dashboard' THEN up.hossein_id
        ELSE up.khosro_id
    END AS task_created_by,
    -- Assign specialized tasks to specific member profiles
    t_data.assigned_id,
    t_data.title,
    t_data.description,
    t_data.due_date
FROM inserted_projects ip
CROSS JOIN user_pool up
CROSS JOIN LATERAL (
    VALUES 
        -- Tasks for "Core Platform Migration" (Evaluated by title match filter below)
        ( 'Setup DB replication clusters', 'Configure replication slots and verify connection throughput rates.', NOW() + INTERVAL '7 days', 'Core Platform Migration', up.john_id ),
        ( 'Run compliance schema validation tests', 'Review tables against strict multi-tenant isolate specifications.', NOW() + INTERVAL '14 days', 'Core Platform Migration', up.marry_id ),

-- Tasks for "Executive Analytics Dashboard"
(
    'Build KPI charts UI wireframes',
    'Design pixel-perfect layout mockups to match enterprise spec requirements.',
    NOW() + INTERVAL '5 days',
    'Executive Analytics Dashboard',
    up.gol_id
),
(
    'Write aggregate data pipeline queries',
    'Develop indexed materialize views optimizing deep metrics retrieval latency.',
    NOW() + INTERVAL '10 days',
    'Executive Analytics Dashboard',
    up.hossein_id
),

-- Tasks for "Mobile Startup MVP"
( 'Integrate OAuth mobile login flows', 'Configure OAuth token parsing securely over client callbacks.', NOW() + INTERVAL '3 days', 'Mobile Startup MVP', up.khosro_id ),
        ( 'Refactor app landing configurations', 'Update internal variables to allow custom multi-region localization features.', NOW() + INTERVAL '20 days', 'Mobile Startup MVP', up.begum_id )
) AS t_data(title, description, due_date, target_project, assigned_id)
WHERE ip.name = t_data.target_project;

-- migrate:down

-- 1. Tasks reference both projects and users, so they must go first —
--    deleting a project or user while a task still points at it would
--    violate the foreign key constraint.
DELETE FROM tasks
WHERE
    project_id IN (
        SELECT id
        FROM projects
        WHERE
            name IN (
                'Core Platform Migration',
                'Executive Analytics Dashboard',
                'Mobile Startup MVP'
            )
    );

-- 2. Projects reference users (current_owner_id, created_by), so they
--    must go before users, but they can go before or after profiles —
--    projects and profiles don't reference each other.
DELETE FROM projects
WHERE
    name IN (
        'Core Platform Migration',
        'Executive Analytics Dashboard',
        'Mobile Startup MVP'
    );

-- 3. Profiles reference users (user_id), so they must go before users.
DELETE FROM user_profiles
WHERE
    user_id IN (
        SELECT id
        FROM users
        WHERE
            email IN (
                'john@devboard.com',
                'marry@devboard.com',
                'hossein@devboard.com',
                'gol@devboard.com',
                'khosro@devboard.com',
                'begum@devboard.com'
            )
    );

-- 4. Users are the root of the dependency graph — safe to delete last,
--    now that nothing else references them.
DELETE FROM users
WHERE
    email IN (
        'john@devboard.com',
        'marry@devboard.com',
        'hossein@devboard.com',
        'gol@devboard.com',
        'khosro@devboard.com',
        'begum@devboard.com'
    );