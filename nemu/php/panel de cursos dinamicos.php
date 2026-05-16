<?php

include '../config/conexion.php';

$sql = "
SELECT cursos.*,
usuarios.nombre AS maestro
FROM cursos
INNER JOIN usuarios
ON cursos.id_maestro = usuarios.id_usuario
";

$result = $conn->query($sql);

?>

<table border="1">

<tr>
    <th>Curso</th>
    <th>Maestro</th>
</tr>

<?php while($curso = $result->fetch_assoc()) { ?>

<tr>

    <td>
        <?php echo $curso['nombre']; ?>
    </td>

    <td>
        <?php echo $curso['maestro']; ?>
    </td>

</tr>

<?php } ?>

</table>