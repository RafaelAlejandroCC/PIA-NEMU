<?php
require_once "../config/conexion.php";
require_once "helpers.php";

$datos = leer_json();

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
    responder([
        "ok" => true,
        "mensaje" => "Registro exitoso.",
        "usuario" => [
            "id_usuario" => $stmt->insert_id,
            "nombre" => $nombre,
            "email" => $email,
            "rol" => $rol
        ]
    ]);
}

if ($conn->errno == 1062) {
    responder(["ok" => false, "mensaje" => "Ese correo ya está registrado."], 409);
}

responder(["ok" => false, "mensaje" => "Error al registrar: " . $conn->error], 500);
?>
