CREATE TABLE developers(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
email VARCHAR(50) NOT NULL UNIQUE,
"developerInfoId" INTEGER UNIQUE,
FOREIGN KEY("developerInfoId") REFERENCES develope_infos("id")
);

CREATE TYPE OS AS ENUM ('Windows','Linux','MacOS');
CREATE TABLE develope_infos(
id SERIAL PRIMARY KEY,
"developerSince" DATE NOT NULL,
"preferredOS" OS NOT NULL
);

CREATE TABLE projects(
id SERIAL PRIMARY KEY,
name VARCHAR(50) NOT NULL,
description TEXT NOT NULL,
"estimatedTime" VARCHAR(20) NOT NULL,
repository  VARCHAR(120) NOT NULL,
"startDate" DATE NOT NULL,
"endDate" DATE,
"developerId" INTEGER NOT NULL,
FOREIGN KEY("developerId") REFERENCES developers("id")

);

CREATE TABLE projects_technologies(
id SERIAL PRIMARY KEY,
"addenIn" DATE NOT NULL,
"projectId" INTEGER NOT NULL,
FOREIGN KEY("projectId") REFERENCES projects("id"),
"technologyId" INTEGER NOT NULL,
FOREIGN KEY("technologyId") REFERENCES technologies("id")
);

CREATE TABLE technologies(
id SERIAL PRIMARY KEY,
name VARCHAR(30)NOT NULL
);

INSERT INTO technologies(name)
VALUES('javaScript'),('Python'),('React'),
('Express.js'),('HTML'),('CSS'),('Django'),
('PostgreSQL'),('MongoDB');