document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formInscripciones");

    const tabla =
        document.getElementById("tablaInscripciones");

    if(!formulario || !tabla) return;

    let inscripciones =
        JSON.parse(
            localStorage.getItem("inscripciones")
        ) || [];

    mostrarInscripciones();

formulario.addEventListener("submit", (e) => {

    e.preventDefault();

    const id =
        document.getElementById(
          "id_inscripciones"
        ).value;

    const idAlumno =
        Number(
        document.getElementById(
          "id_alumno"
        ).value
    );

    const idCurso =
        Number(
        document.getElementById(
          "id_curso"
        ).value
    );

    const estado =
        document.getElementById(
          "estado"
        ).value
        .trim();

    /*
    OBTENER DATOS EXISTENTES
    */

    const alumnos =
        JSON.parse(
            localStorage.getItem("alumnos")
        ) || [];

    const cursos =
        JSON.parse(
            localStorage.getItem("cursos")
        ) || [];

    /*
    VALIDAR ALUMNO
    */

    const alumnoExiste =
        alumnos.find(
          a => Number(a.id) === idAlumno
        );

    if(!alumnoExiste){

        alert(
            "El alumno no existe"
        );

        return;
    }

    /*
    VALIDAR CURSO
    */

    const cursoExiste =
        cursos.find(
          c => Number(c.id) === idCurso
        );

    if(!cursoExiste){

        alert(
            "El curso no existe"
        );

        return;
    }

    /*
    CREAR INSCRIPCIÓN
    */

    const inscripcion = {

        id:
            id || Date.now(),

        idAlumno:
            idAlumno,

        idCurso:
            idCurso,

        estado:
            estado

    };

    /*
    EDITAR
    */

    if(id){

        inscripciones =
            inscripciones.map(i =>
                i.id == id
                ? inscripcion
                : i
            );

    } else {

        inscripciones.push(
            inscripcion
        );

    }

    guardarDatos();

    formulario.reset();

    document.getElementById(
        "id_inscripciones"
    ).value = "";

    mostrarInscripciones();

    });
    /*
    MOSTRAR TABLA
    */

    function mostrarInscripciones(){

        tabla.innerHTML = "";

        inscripciones.forEach(inscripcion => {

            tabla.innerHTML += `

            <tr>

                <td>${inscripcion.id}</td>

                <td>

                    Alumno ID:
                    ${inscripcion.idAlumno}

                </td>

                <td>

                    Curso ID:
                    ${inscripcion.idCurso}

                </td>

                <td>

                    <span class="badge text-bg-success">

                        ${inscripcion.estado}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-info"
                        onclick="editarInscripcion(${inscripcion.id})">

                        Editar

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="eliminarInscripcion(${inscripcion.id})">

                        Eliminar

                    </button>

                </td>

            </tr>

            `;

        });

    }

    /*
    GUARDAR
    */

    function guardarDatos(){

        localStorage.setItem(
            "inscripciones",
            JSON.stringify(inscripciones)
        );

    }

    /*
    EDITAR
    */

    window.editarInscripcion = (id) => {

        const inscripcion =
            inscripciones.find(
                i => i.id == id
            );

        document.getElementById(
            "id_inscripciones"
        ).value = inscripcion.id;

        document.getElementById(
            "id_alumno"
        ).value = inscripcion.idAlumno;

        document.getElementById(
            "id_curso"
        ).value = inscripcion.idCurso;

        document.getElementById(
            "estado"
        ).value = inscripcion.estado;

    };

    /*
    ELIMINAR
    */

    window.eliminarInscripcion = (id) => {

        inscripciones =
            inscripciones.filter(
                i => i.id != id
            );

        guardarDatos();

        mostrarInscripciones();

    };

});