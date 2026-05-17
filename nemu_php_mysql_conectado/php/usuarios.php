<?php
require_once "../config/conexion.php";
require_once "helpers.php";

$metodo = $_SERVER["REQUEST_METHOD"];

if ($metodo === "GET") {
    $sql = "SELECT id_usuario, nombre, email, rol, activo, fecha_registro FROM usuarios ORDER BY id_usuario DESC";
    $resultado = $conn->query($sql);

    $usuarios = [];
    while ($fila = $resultado->fetch_assoc()) {
        $usuarios[] = $fila;
    }

    responder(["ok" => true, "usuarios" => $usuarios]);
}

$datos = leer_json();

if ($metodo === "POST") {
    $nombre = trim($datos["nombre"] ?? "");
    $email = trim($datos["email"] ?? "");
    $password = $datos["password"] ?? "";
    $rol = $datos["rol"] ?? "alumno";

    if ($nombre === "" || $email === "" || $password === "" || !in_array($rol, ["alumno", "maestro"])) {
        responder(["ok" => false, "mensaje" => "Datos incompletos o rol inválido."], 400);
    }

    $hash = password_hash($password, PASSWORD_DEFAULT);

    $stmt = $conn->prepare("INSERT INTO usuarios (nombre, email, contrasena_hash, rol) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nombre, $email, $hash, $rol);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Usuario registrado correctamente.", "id_usuario" => $stmt->insert_id]);
    }

    responder(["ok" => false, "mensaje" => "Error al registrar usuario: " . $conn->error], 500);
}

if ($metodo === "PUT") {
    $id = intval($datos["id_usuario"] ?? 0);
    $nombre = trim($datos["nombre"] ?? "");
    $email = trim($datos["email"] ?? "");
    $rol = $datos["rol"] ?? "alumno";
    $activo = intval($datos["activo"] ?? 1);

    if ($id <= 0 || $nombre === "" || $email === "" || !in_array($rol, ["alumno", "maestro"])) {
        responder(["ok" => false, "mensaje" => "Datos incompletos o rol inválido."], 400);
    }

    if (!empty($datos["password"])) {
        $hash = password_hash($datos["password"], PASSWORD_DEFAULT);
        $stmt = $conn->prepare("UPDATE usuarios SET nombre=?, email=?, contrasena_hash=?, rol=?, activo=? WHERE id_usuario=?");
        $stmt->bind_param("ssssii", $nombre, $email, $hash, $rol, $activo, $id);
    } else {
        $stmt = $conn->prepare("UPDATE usuarios SET nombre=?, email=?, rol=?, activo=? WHERE id_usuario=?");
        $stmt->bind_param("sssii", $nombre, $email, $rol, $activo, $id);
    }

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Usuario actualizado correctamente."]);
    }

    responder(["ok" => false, "mensaje" => "Error al actualizar usuario: " . $conn->error], 500);
}

if ($metodo === "DELETE") {
    $id = intval($_GET["id"] ?? 0);

    if ($id <= 0) {
        responder(["ok" => false, "mensaje" => "ID inválido."], 400);
    }

    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id_usuario=?");
    $stmt->bind_param("i", $id);

    if ($stmt->execute()) {
        responder(["ok" => true, "mensaje" => "Usuario eliminado correctamente."]);
    }

    responder(["ok" => false, "mensaje" => "Error al eliminar usuario: " . $conn->error], 500);
}

responder(["ok" => false, "mensaje" => "Método no permitido."], 405);
?>
