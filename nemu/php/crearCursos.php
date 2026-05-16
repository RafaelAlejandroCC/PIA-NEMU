<?php

session_start();

include '../config/conexion.php';

$nombre = $_POST['nombre'];
$descripcion = $_POST['descripcion'];

$idMaestro = $_SESSION['usuario']['id_usuario'];

$sql = "
INSERT INTO cursos(
    nombre,
    descripcion,
    id_maestro,
    fecha_creacion
)
VALUES(
    '$nombre',
    '$descripcion',
    '$idMaestro',
    NOW()
)
";

if($conn->query($sql)){

    echo "Curso creado";

}else{

    echo "Error";

}

?>