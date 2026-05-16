<?php

$sql = "
SELECT *
FROM usuarios
WHERE rol='alumno'
";

$result = $conn->query($sql);

while($alumno = $result->fetch_assoc()){

    echo $alumno['nombre'];

}
?>