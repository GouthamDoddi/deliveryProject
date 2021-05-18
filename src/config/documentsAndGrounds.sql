
CREATE TABLE documents
(
    id SERIAL,
    name varchar NOT NULL,
    framework VARCHAR NOT NULL,
    file_location VARCHAR NOT NULL,
    file_type VARCHAR NOT NULL,
    upload_date TIMESTAMP DEFAULT Now(),
    uploaded_by INTEGER NOT NULL,
    version INTEGER,
    size INTEGER
)

CREATE TABLE GROUNDS
(
    id SERIAL,
    status VARCHAR NOT NULL,
    title VARCHAR NOT NULL,
    description VARCHAR,
    attachments_id integer[] default '{}'::integer[],
    case_ids integer[] default '{}'::integer[],
    categories varchar[],
    created_by INTEGER NOT NULL,
    created_at timestamp default Now(),
    modified_by integer,
    proposed_date timestamp
)

CREATE TABLE CASE_ACTIONS
(
    id SERIAL,
    case_id INTEGER NOT NULL,
    ground_manager_id INTEGER NOT NULL,
    ground_id INTEGER NOT NULL,
    case_status_before_action VARCHAR,
    case_status_after_action VARCHAR,
    action_time timestamp default Now(),
    case_priority VARCHAR,
    case_categories varchar[] default '{}'::varchar[]
)
