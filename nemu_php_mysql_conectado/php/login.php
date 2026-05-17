<?php
session_start();

require_once "../config/conexion.php";
require_once "helpers.php";

$datos = leer_json();

$email = trim($datos["email"] ?? "");
$password = $datos["password"] ?? "";
$rol = $datos["rol"] ?? "";

if ($email === "" || $password === "" || $rol === "") {
    responder(["ok" => false, "mensaje" => "Correo, contraseña y rol son obligatorios."], 400);
}

$stmt = $conn->prepare("SELECT id_usuario, nombre, email, contrasena_hash, rol, activo FROM usuarios WHERE email=? AND rol=? LIMIT 1");
$stmt->bind_param("ss", $email, $rol);
$stmt->execute();

$resultado = $stmt->get_result();

if ($resultado->num_rows === 0) {
    responder(["ok" => false, "mensaje" => "Usuario no encontrado o rol incorrecto."], 401);
}

$usuario = $resultado->fetch_assoc();

if (!$usuario["activo"]) {
    responder(["ok" => false, "mensaje" => "El usuario está inactivo."], 403);
}

if (!password_verify($password, $usuario["contrasena_hash"])) {
    responder(["ok" => false, "mensaje" => "Contraseña incorrecta."], 401);
}

$_SESSION["usuario"] = [
    "id_usuario" => $usuario["id_usuario"],
    "nombre" => $usuario["nombre"],
    "email" => $usuario["email"],
    "rol" => $usuario["rol"]
];

responder([
    "ok" => true,
    "mensaje" => "Inicio de sesión correcto.",
    "usuario" => $_SESSION["usuario"]
]);
?>
