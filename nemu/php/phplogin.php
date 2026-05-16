<?php

session_start();
include '../config/conexion.php';

$email = $_POST['email'];
$password = $_POST['password'];

$sql = "SELECT * FROM usuarios WHERE email='$email'";

$result = $conn->query($sql);

if($result->num_rows > 0){

    $usuario = $result->fetch_assoc();

    if(password_verify($password, $usuario['contrasena_hash'])){

        $_SESSION['usuario'] = $usuario;

        if($usuario['rol'] == 'alumno'){

            header("Location: ../html/dashboard-alumno.php");

        }elseif($usuario['rol'] == 'maestro'){

            header("Location: ../html/dashboard-maestro.php");

        }

    }else{

        echo "Contraseña incorrecta";

    }

}else{

    echo "Usuario no encontrado";

}

?>