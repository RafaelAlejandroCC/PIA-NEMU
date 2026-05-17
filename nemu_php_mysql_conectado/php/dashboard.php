<?php
session_start();

require_once "../config/conexion.php";
require_once "helpers.php";

if (!isset($_SESSION["usuario"])) {
    responder(["ok" => false, "mensaje" => "Sesión no iniciada."], 401);
}

$usuario = $_SESSION["usuario"];

if ($usuario["rol"] === "alumno") {
    $stmt = $conn->prepare("
        SELECT c.id_curso, c.nombre, c.descripcion, u.nombre AS maestro, i.estado
        FROM inscripciones i
        INNER JOIN cursos c ON i.id_curso = c.id_curso
        INNER JOIN usuarios u ON c.id_maestro = u.id_usuario
        WHERE i.id_alumno = ?
        ORDER BY c.nombre
    ");
    $stmt->bind_param("i", $usuario["id_usuario"]);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $cursos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $cursos[] = $fila;
    }

    responder(["ok" => true, "usuario" => $usuario, "cursos" => $cursos]);
}

if ($usuario["rol"] === "maestro") {
    $stmt = $conn->prepare("
        SELECT id_curso, nombre, descripcion, estado
        FROM cursos
        WHERE id_maestro = ?
        ORDER BY id_curso DESC
    ");
    $stmt->bind_param("i", $usuario["id_usuario"]);
    $stmt->execute();
    $resultado = $stmt->get_result();

    $cursos = [];
    while ($fila = $resultado->fetch_assoc()) {
        $cursos[] = $fila;
    }

    responder(["ok" => true, "usuario" => $usuario, "cursos" => $cursos]);
}

responder(["ok" => false, "mensaje" => "Rol inválido."], 403);
?>
