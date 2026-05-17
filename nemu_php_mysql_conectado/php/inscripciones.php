<?php
require_once "../config/conexion.php";
require_once "helpers.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo === "GET") {
    $sql = "
        SELECT
            i.id_inscripcion,
            i.id_alumno,
            i.id_curso,
            i.estado,
            i.fecha_inscripcion,
            a.nombre AS alumno,
            c.nombre AS curso
        FROM inscripciones i
        INNER JOIN usuarios a ON i.id_alumno = a.id_usuario
        INNER JOIN cursos c ON i.id_curso = c.id_curso
        ORDER BY i.id_inscripcion DESC
    ";

    $resultado = $conn->query($sql);
    $inscripciones = [];

    while ($fila = $resultado->fetch_assoc()) {
        $inscripciones[] = $fila;
    }

    responder(["ok" => true, "inscripciones" => $inscripciones]);
}

$datos = leer_json();

if ($metodo === "POST") {
    $id_alumno = intval($datos["id_alumno"] ?? 0);
    $id_curso = intval($datos["id_curso"] ?? 0);
    $estado = trim($datos["estado"] ?? "Activo");

    if ($id_alumno <= 0 || $id_curso <= 0) {
        responder(["ok" => false, "mensaje" => "ID Alumno e ID Curso son obligatorios."], 400);
    }

    $stmt = $conn->prepare("INSERT INTO inscripciones (id_alumno, id_curso, estado) VALUES (?, ?, ?)");
    $stmt->bind_param("iis", $id_alumno, $id_curso, $estado);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Inscripción registrada correctamente.", "id_inscripcion" => $stmt->insert_id]);
    }

    responder(["ok" => false, "mensaje" => "Error al registrar inscripción: " . $conn->error], 500);
}

if ($metodo === "PUT") {
    $id = intval($datos["id_inscripcion"] ?? 0);
    $id_alumno = intval($datos["id_alumno"] ?? 0);
    $id_curso = intval($datos["id_curso"] ?? 0);
    $estado = trim($datos["estado"] ?? "Activo");

    if ($id <= 0 || $id_alumno <= 0 || $id_curso <= 0) {
        responder(["ok" => false, "mensaje" => "Datos incompletos."], 400);
    }

    $stmt = $conn->prepare("UPDATE inscripciones SET id_alumno=?, id_curso=?, estado=? WHERE id_inscripcion=?");
    $stmt->bind_param("iisi", $id_alumno, $id_curso, $estado, $id);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Inscripción actualizada correctamente."]);
    }

    responder(["ok" => false, "mensaje" => "Error al actualizar inscripción: " . $conn->error], 500);
}

if ($metodo === "DELETE") {
    $id = intval($_GET["id"] ?? 0);

    if ($id <= 0) {
        responder(["ok" => false, "mensaje" => "ID inválido."], 400);
    }

    $stmt = $conn->prepare("DELETE FROM inscripciones WHERE id_inscripcion=?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Inscripción eliminada correctamente."]);
    }

    responder(["ok" => false, "mensaje" => "Error al eliminar inscripción: " . $conn->error], 500);
}

responder(["ok" => false, "mensaje" => "Método no permitido."], 405);
?>
