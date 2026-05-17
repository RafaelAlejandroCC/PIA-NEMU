<?php
function responder($datos, $codigo = 200) {
    http_response_code($codigo);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode($datos, JSON_UNESCAPED_UNICODE);
    exit;
}

function leer_json() {
    $entrada = file_get_contents("php://input");
    $datos = json_decode($entrada, true);
    return is_array($datos) ? $datos : $_POST;
}
?>
