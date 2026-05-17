CREATE DATABASE IF NOT EXISTS nemu_ CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE nemu_;

DROP TABLE IF EXISTS inscripciones;
DROP TABLE IF EXISTS cursos;
DROP TABLE IF EXISTS usuarios;

CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,
    rol ENUM('alumno', 'maestro') NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE cursos (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,
    id_maestro INT NOT NULL,
    estado VARCHAR(50) DEFAULT 'Activo',
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_maestro)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE
);

CREATE TABLE inscripciones (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,
    id_alumno INT NOT NULL,
    id_curso INT NOT NULL,
    estado VARCHAR(50) DEFAULT 'Activo',
    fecha_inscripcion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_alumno)
        REFERENCES usuarios(id_usuario)
        ON DELETE CASCADE,
    FOREIGN KEY (id_curso)
        REFERENCES cursos(id_curso)
        ON DELETE CASCADE,
    UNIQUE KEY unique_alumno_curso (id_alumno, id_curso)
);

INSERT INTO usuarios (nombre, email, contrasena_hash, rol)
VALUES
('Administrador', 'admin@nemu.com', '$2y$12$vVSAJdQh6sXfPvpZM1bWBehAT5Ngve9KRYG7aKhk2K00Drd4euP6O', 'maestro'),
('Alumno Demo', 'alumno@nemu.com', '$2y$12$vVSAJdQh6sXfPvpZM1bWBehAT5Ngve9KRYG7aKhk2K00Drd4euP6O', 'alumno');

INSERT INTO cursos (nombre, descripcion, id_maestro)
VALUES
('Matemáticas', 'Curso básico de matemáticas', 1),
('Programación Web', 'HTML CSS JavaScript y PHP', 1),
('Bases de Datos', 'Introducción a MySQL', 1);

INSERT INTO inscripciones (id_alumno, id_curso, estado)
VALUES
(2, 1, 'Activo'),
(2, 2, 'Activo');
