<?php

session_start();

include '../config/conexion.php';

$idMaestro = $_SESSION['usuario']['id_usuario'];

$sql = "
SELECT *
FROM cursos
WHERE id_maestro = $idMaestro
";

$result = $conn->query($sql);

?>

<h1>Mis cursos</h1>

<?php while($curso = $result->fetch_assoc()) { ?>

<div>

    <h2>
        <?php echo $curso['nombre']; ?>
    </h2>

</div>

<?php } ?>