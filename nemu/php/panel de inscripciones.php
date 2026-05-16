<?php

$sql = "
SELECT
usuarios.nombre AS alumno,
cursos.nombre AS curso
FROM inscripciones

INNER JOIN usuarios
ON inscripciones.id_alumno = usuarios.id_usuario

INNER JOIN cursos
ON inscripciones.id_curso = cursos.id_curso
";

$result = $conn->query($sql);

?>

<table>

<?php while($fila = $result->fetch_assoc()) { ?>

<tr>

    <td>
        <?php echo $fila['alumno']; ?>
    </td>

    <td>
        <?php echo $fila['curso']; ?>
    </td>

</tr>

<?php } ?>

</table>