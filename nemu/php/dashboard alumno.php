<?php

session_start();

include '../config/conexion.php';

$idAlumno = $_SESSION['usuario']['id_usuario'];

$sql = "
SELECT cursos.nombre, cursos.descripcion
FROM inscripciones
INNER JOIN cursos
ON inscripciones.id_curso = cursos.id_curso
WHERE inscripciones.id_alumno = $idAlumno
";

$result = $conn->query($sql);

?>

<h1>Mis cursos</h1>

<?php while($curso = $result->fetch_assoc()) { ?>

<div class="card">

    <h3>
        <?php echo $curso['nombre']; ?>
    </h3>

    <p>
        <?php echo $curso['descripcion']; ?>
    </p>

</div>

<?php } ?>