DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_species') THEN 
        CREATE TYPE enum_species AS ENUM ('dog', 'cat'); 
    END IF; 
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'enum_status') THEN 
        CREATE TYPE enum_status AS ENUM ('scheduled', 'done', 'canceled'); 
    END IF; 
END $$;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS pets (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    species enum_species NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS clients (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    pet_id UUID NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (pet_id) REFERENCES pets(id)
);

CREATE TABLE IF NOT EXISTS schedules (
    id UUID NOT NULL DEFAULT uuid_generate_v4(),
    timestamp BIGINT NOT NULL,
    status enum_status NOT NULL NOT NULL DEFAULT 'scheduled',
    client_id UUID NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (client_id) REFERENCES clients(id)
);