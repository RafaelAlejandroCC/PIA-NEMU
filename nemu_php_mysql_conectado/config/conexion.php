<?php
$host = "localhost";
$usuario = "root";
$password = "";
$base_datos = "nemu_";

$conn = new mysqli($host, $usuario, $password, $base_datos);

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode([
        "ok" => false,
        "mensaje" => "Error de conexión: " . $conn->connect_error
    ]));
}

$conn->set_charset("utf8mb4");
?>
