CREATE DATABASE sistema_cursos;
USE sistema_cursos;
CREATE TABLE usuarios (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    contrasena_hash VARCHAR(255) NOT NULL,

    rol VARCHAR(20) NOT NULL COMMENT 'Valores permitidos: alumno o maestro',

    activo BOOLEAN NOT NULL DEFAULT TRUE,

    fecha_registro DATETIME NOT NULL,

    INDEX idx_nombre (nombre)
);
CREATE TABLE cursos (
    id_curso INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    descripcion TEXT,

    id_maestro INT NOT NULL COMMENT 'Debe referenciar un usuario con rol maestro',

    fecha_creacion DATETIME NOT NULL,
    fecha_actualizacion DATETIME,

    estado VARCHAR(30) NOT NULL DEFAULT 'activo',

    FOREIGN KEY (id_maestro)
    REFERENCES usuarios(id_usuario)
);
CREATE TABLE inscripciones (
    id_inscripcion INT AUTO_INCREMENT PRIMARY KEY,

    id_alumno INT NOT NULL COMMENT 'Debe referenciar un usuario con rol alumno',
    id_curso INT NOT NULL,

    fecha_inscripcion DATETIME NOT NULL,

    estado VARCHAR(30) NOT NULL DEFAULT 'activa',

    UNIQUE (id_alumno, id_curso),

    FOREIGN KEY (id_alumno)
    REFERENCES usuarios(id_usuario),

    FOREIGN KEY (id_curso)
    REFERENCES cursos(id_curso)
);
INSERT INTO usuarios (
    nombre,
    email,
    contrasena_hash,
    rol,
    activo,
    fecha_registro
)
VALUES (
    'Juan Pérez',
    'juan@example.com',
    '123456',
    'maestro',
    TRUE,
    NOW()
);
SELECT * FROM usuarios;