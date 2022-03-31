-- Deploy starry-night:1-inital to pg

BEGIN;

CREATE TABLE "user" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    firstname text NOT NULL,
    lastname text NOT NULL,
    email text NOT NULL UNIQUE,
    "password" text NOT NULL,
    "role" text NOT NULL,
    "notification" boolean DEFAULT false,
    geolocalisation boolean DEFAULT false,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "place" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    address text,
    postalcode text,
    city text,
    latitude real NOT NULL,
    longitude real NOT NULL,
    user_id int REFERENCES user(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "event" (
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" text NOT NULL,
    event_datetime timestamptz NOT NULL,
    latitude real NOT NULL,
    longitude real NOT NULL,
    recall_datetime timestamptz,
    user_id int REFERENCES user(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "planet"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE,
    img_name text UNIQUE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "constellation"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL UNIQUE,
    latin_name text UNIQUE,
    scientific_name text UNIQUE,
    img_name text UNIQUE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "galaxy"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    scientific_name text NOT NULL UNIQUE,
    traditional_name text UNIQUE,
    name text UNIQUE,
    img_name text UNIQUE,
    constellation_id int REFERENCES constellation(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "star"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    traditional_name text NOT NULL UNIQUE,
    tradition text,
    name text UNIQUE,
    img_name text UNIQUE,
    constellation_id int REFERENCES constellation(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "myth"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name text NOT NULL,
    story text NOT NULL,
    img_name text UNIQUE,
    constellation_id int REFERENCES constellation(id) ON DELETE CASCADE,
    star_id int REFERENCES star(id) ON DELETE CASCADE,
    planet_id int REFERENCES planet(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "reserve_event"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    event_id int NOT NULL REFERENCES event(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "save_place"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    place_id int NOT NULL REFERENCES place(id) ON DELETE CASCADE,
    "user_id" int NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "favorite_constellation"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    constellation_id int NOT NULL REFERENCES constellation(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);
CREATE TABLE "prefer_planet"(
    id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "user_id" int NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
    planet_id int NOT NULL REFERENCES planet(id) ON DELETE CASCADE,
    created_at timestamptz NOT NULL DEFAULT NOW(),
    updated_at timestamptz
);

COMMIT;