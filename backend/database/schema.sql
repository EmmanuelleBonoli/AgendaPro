DROP DATABASE IF EXISTS AgendaPro;

CREATE DATABASE AgendaPro;

USE AgendaPro;

CREATE TABLE user (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, lastName VARCHAR(80) NOT NULL, firstName VARCHAR(80) NOT NULL, email VARCHAR(80) NOT NULL, hashed_password VARCHAR(250) NOT NULL, image VARCHAR(250) NOT NULL DEFAULT '', enterprise VARCHAR(100) NULL
);

CREATE TABLE appointment (
    id INT PRIMARY KEY AUTO_INCREMENT NOT NULL, dateStart DATE NOT NULL, allDay BOOLEAN NOT NULL DEFAULT FALSE, hourStart INT NULL, minuteStart INT NULL, hourFinish INT NULL, minuteFinish INT NULL, dateFinish DATE NOT NULL, category VARCHAR(7) NOT NULL DEFAULT '#fbb13c', place VARCHAR(150) NULL, commentary VARCHAR(300) NULL
);

CREATE TABLE coworker (
    workerId INT NOT NULL, coworkerId INT NOT NULL, askingCoworker BOOLEAN NOT NULL DEFAULT FALSE, autorisation BOOLEAN NOT NULL DEFAULT FALSE, CONSTRAINT pk_coworker PRIMARY KEY (workerId, coworkerId), CONSTRAINT fk_worker FOREIGN KEY (workerId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT fk_coworker FOREIGN KEY (coworkerId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

CREATE TABLE meeting (
    userId INT NOT NULL, appointmentId INT NOT NULL, CONSTRAINT pk_meeting PRIMARY KEY (userId, appointmentId), CONSTRAINT fk_user FOREIGN KEY (userId) REFERENCES user (id) ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT fk_appointment FOREIGN KEY (appointmentId) REFERENCES appointment (id) ON DELETE CASCADE ON UPDATE NO ACTION
);

INSERT INTO
    user (
        lastName, firstName, email, hashed_password, image, enterprise
    )
VALUES (
        "Bonoli", "Manu", "manu@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$KkE/UV0sisYsBf09Sl+dMQ$fcsJDQ9Dor6xVUGyaDLtvvyz2DLpXpuwQLrZ5x99g34", "", "Major Company"
    ),
    (
        "Soliman", "Irwin", "irwin@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$KkE/UV0sisYsBf09Sl+dMQ$fcsJDQ9Dor6xVUGyaDLtvvyz2DLpXpuwQLrZ5x99g34", "", "Sirehna"
    ),
    (
        "Vernet", "Hélène", "helene@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$KkE/UV0sisYsBf09Sl+dMQ$fcsJDQ9Dor6xVUGyaDLtvvyz2DLpXpuwQLrZ5x99g34", "", "WCS"
    ),
    (
        "Emeriau", "Aurélien", "aurelien@gmail.com", "$argon2id$v=19$m=19456,t=2,p=1$KkE/UV0sisYsBf09Sl+dMQ$fcsJDQ9Dor6xVUGyaDLtvvyz2DLpXpuwQLrZ5x99g34", "", "WCS"
    ),
    (
        "Lebeau", "Guillaume", "guillaume@hotmail.fr", "$argon2id$v=19$m=19456,t=2,p=1$KkE/UV0sisYsBf09Sl+dMQ$fcsJDQ9Dor6xVUGyaDLtvvyz2DLpXpuwQLrZ5x99g34", "", "WCS"
    );

INSERT INTO
    appointment (
        dateStart, allDay, hourStart, minuteStart, hourFinish, minuteFinish, dateFinish, category, place, commentary
    )
VALUES (
        "2024-01-31", 0, 10, 30, 12, 00, "2024-01-31", '#fbb13c', "Salle A", "pensez à prendre le dossier X"
    ),
    (
        "2024-02-15", 0, 09, 30, 11, 00, "2024-02-15", '#fbb13c', "Salle A", "Réunion stratégique"
    ),
    (
        "2024-02-16", 1, NULL, NULL, NULL, NULL, "2024-02-16", '#fbb13c', "Bureau B", "Point individuel"
    ),
    (
        "2024-02-17", 0, 14, 00, 15, 30, "2024-02-17", '#fbb13c', "Salle C", "Présentation des résultats"
    ),
    (
        "2024-02-18", 0, 11, 00, 12, 30, "2024-02-18", '#fbb13c', "Salle D", "Entretien avec M. Dupont"
    ),
    (
        "2024-02-19", 1, NULL, NULL, NULL, NULL, "2024-02-19", '#fbb13c', "Bureau E", "Point individuel"
    ),
    (
        "2024-02-20", 0, 16, 30, 18, 00, "2024-02-20", '#fbb13c', "Salle F", "Discussion sur le projet Alpha"
    ),
    (
        "2024-02-21", 0, 10, 00, 11, 30, "2024-02-21", '#fbb13c', "Salle G", "Entretien de recrutement"
    ),
    (
        "2024-02-22", 1, NULL, NULL, NULL, NULL, "2024-02-22", '#fbb13c', "Bureau H", "Point individuel"
    ),
    (
        "2024-02-23", 0, 13, 00, 14, 30, "2024-02-23", '#fbb13c', "Salle I", "Réunion avec l'équipe"
    ),
    (
        "2024-02-24", 0, 15, 30, 17, 00, "2024-02-24", '#fbb13c', "Salle J", "Présentation du plan marketing"
    ),
    (
        "2024-02-25", 1, NULL, NULL, NULL, NULL, "2024-02-25", '#fbb13c', "Bureau K", "Point individuel"
    ),
    (
        "2024-02-26", 0, 08, 45, 10, 15, "2024-02-26", '#fbb13c', "Salle L", "Réunion opérationnelle"
    ),
    (
        "2024-02-27", 0, 14, 30, 16, 00, "2024-02-27", '#fbb13c', "Salle M", "Discussion sur le budget"
    ),
    (
        "2024-02-28", 1, NULL, NULL, NULL, NULL, "2024-02-28", '#fbb13c', "Bureau N", "Point individuel"
    ),
    (
        "2024-02-29", 0, 12, 00, 13, 30, "2024-02-29", '#fbb13c', "Salle O", "Entretien avec Mme. Dubois"
    ),
    (
        "2024-03-01", 0, 09, 30, 11, 00, "2024-03-01", '#fbb13c', "Salle P", "Discussion sur le plan d'affaires"
    ),
    (
        "2024-03-02", 1, NULL, NULL, NULL, NULL, "2024-03-02", '#fbb13c', "Bureau Q", "Point individuel"
    ),
    (
        "2024-03-03", 0, 15, 00, 16, 30, "2024-03-03", '#fbb13c', "Salle R", "Présentation du prototype"
    ),
    (
        "2024-03-04", 0, 11, 30, 13, 00, "2024-03-04", '#fbb13c', "Salle S", "Entretien avec M. Martin"
    ),
    (
        "2024-03-05", 1, NULL, NULL, NULL, NULL, "2024-03-05", '#fbb13c', "Bureau T", "Point individuel"
    );

INSERT INTO
    coworker (
        workerId, coworkerId, askingCoworker, autorisation
    )
VALUES (1, 2, 1, 1),
    (2, 1, 1, 0),
    (1, 3, 1, 0),
    (3, 1, 1, 0),
    (1, 4, 0, 0),
    (1, 5, 0, 0);

INSERT INTO
    meeting (userId, appointmentId)
VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (1, 4),
    (2, 5),
    (1, 5),
    (3, 6),
    (4, 7),
    (4, 8),
    (5, 9),
    (1, 9),
    (2, 10),
    (2, 11),
    (2, 12),
    (1, 12),
    (3, 13),
    (3, 14),
    (1, 15),
    (1, 16),
    (1, 17),
    (2, 18),
    (3, 18),
    (1, 19),
    (1, 20),
    (1, 21);
