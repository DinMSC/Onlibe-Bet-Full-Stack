CREATE DATABASE agilno;

CREATE TYPE event_type AS ENUM ('football', 'tennis');

CREATE TABLE users(
user_id uuid PRIMARY KEY DEFAULT
uuid_generate_v4(),
user_name VARCHAR(255) NOT NULL,
user_email VARCHAR(255) NOT NULL,
user_password VARCHAR(255) NOT NULL,
user_balance INT DEFAULT 500
);

CREATE TABLE tickets(
tickets_id uuid PRIMARY key default uuid_generate_v4 (),
events VARCHAR()[]
)

CREATE TABLE events(
event_id uuid PRIMARY key default uuid_generate_v4 (),
type event_type NOT null,
options INT[] NOT null,
odds INT[] not null,
names VARCHAR(255)[]
)




