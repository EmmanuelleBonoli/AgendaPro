DROP DATABASE IF EXISTS AgendaPro;

CREATE DATABASE AgendaPro;

USE AgendaPro;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    lastName VARCHAR(80) NOT NULL, 
    firstName VARCHAR(80) NOT NULL, 
    email VARCHAR(80) NOT NULL, 
    hashed_password VARCHAR(250) NOT NULL, 
    image VARCHAR(250) NOT NULL DEFAULT '', 
    enterprise VARCHAR(100) NULL
);

CREATE TABLE appointment (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, 
    date_start DATE NOT NULL,
    all_day BOOLEAN NOT NULL DEFAULT FALSE,
    hour_start TIME NULL,
    hour_finish TIME NULL,
    date_finish DATE NOT NULL,
    category VARCHAR(7) NOT NULL DEFAULT '#fbb13c',
    place VARCHAR(150) NULL,
    commentary VARCHAR(300) NULL,
);

CREATE TABLE coWorker (
    worker_id INT NOT NULL,
    coworker_id INT NOT NULL,
    askingCoworker BOOLEAN NOT NULL DEFAULT FALSE,
    autorisation BOOLEAN NOT NULL DEFAULT FALSE,
    CONSTRAINT pk_coWorker PRIMARY KEY (worker_id, coworker_id),
    CONSTRAINT fk_worker FOREIGN KEY (worker_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_coworker FOREIGN KEY (coworker_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE meeting (
    user_id INT NOT NULL,
    appointment_id INT NOT NULL,
    CONSTRAINT pk_meeting PRIMARY KEY (user_id, appointment_id),
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION,
    CONSTRAINT fk_appointment FOREIGN KEY (appointment_id) REFERENCES appointment (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

