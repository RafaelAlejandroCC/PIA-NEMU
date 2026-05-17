<?php
require_once "../config/conexion.php";
require_once "helpers.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo === "GET") {
    $sql = "
        SELECT
            c.id_curso,
            c.nombre,
            c.descripcion,
            c.id_maestro,
            c.estado,
            u.nombre AS maestro
        FROM cursos c
        INNER JOIN usuarios u ON c.id_maestro = u.id_usuario
        ORDER BY c.id_curso DESC
    ";

    $resultado = $conn->query($sql);
    $cursos = [];

    while ($fila = $resultado->fetch_assoc()) {
        $cursos[] = $fila;
    }

    responder(["ok" => true, "cursos" => $cursos]);
}

$datos = leer_json();

if ($metodo === "POST") {
    $nombre = trim($datos["nombre"] ?? "");
    $descripcion = trim($datos["descripcion"] ?? "");
    $id_maestro = intval($datos["id_maestro"] ?? 0);

    if ($nombre === "" || $id_maestro <= 0) {
        responder(["ok" => false, "mensaje" => "Nombre del curso e ID Maestro son obligatorios."], 400);
    }

    $stmt = $conn->prepare("INSERT INTO cursos (nombre, descripcion, id_maestro) VALUES (?, ?, ?)");
    $stmt->bind_param("ssi", $nombre, $descripcion, $id_maestro);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Curso registrado correctamente.", "id_curso" => $stmt->insert_id]);
    }

    responder(["ok" => false, "mensaje" => "Error al registrar curso: " . $conn->error], 500);
}

if ($metodo === "PUT") {
    $id = intval($datos["id_curso"] ?? 0);
    $nombre = trim($datos["nombre"] ?? "");
    $descripcion = trim($datos["descripcion"] ?? "");
    $id_maestro = intval($datos["id_maestro"] ?? 0);
    $estado = trim($datos["estado"] ?? "Activo");

    if ($id <= 0 || $nombre === "" || $id_maestro <= 0) {
        responder(["ok" => false, "mensaje" => "Datos incompletos."], 400);
    }

    $stmt = $conn->prepare("UPDATE cursos SET nombre=?, descripcion=?, id_maestro=?, estado=? WHERE id_curso=?");
    $stmt->bind_param("ssisi", $nombre, $descripcion, $id_maestro, $estado, $id);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Curso actualizado correctamente."]);
    }

    responder(["ok" => false, "mensaje" => "Error al actualizar curso: " . $conn->error], 500);
}

if ($metodo === "DELETE") {
    $id = intval($_GET["id"] ?? 0);

    if ($id <= 0) {
        responder(["ok" => false, "mensaje" => "ID inválido."], 400);
    }

    $stmt = $conn->prepare("DELETE FROM cursos WHERE id_curso=?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Curso eliminado correctamente."]);
    }

    responder(["ok" => false, "mensaje" => "Error al eliminar curso: " . $conn->error], 500);
}

responder(["ok" => false, "mensaje" => "Método no permitido."], 405);
?>
