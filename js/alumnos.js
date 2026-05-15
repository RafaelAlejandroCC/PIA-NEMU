function generarID(clave){

    let ultimoID =
        Number(
            localStorage.getItem(clave)
        ) || 2101760;

    ultimoID++;

    localStorage.setItem(
        clave,
        ultimoID
    );

    return ultimoID;

}
document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formAlumnos");

    const tabla =
        document.getElementById("tablaAlumnos");

    let alumnos =
        JSON.parse(
            localStorage.getItem("alumnos")
        ) || [];

    mostrarAlumnos();

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const id =
            document.getElementById("id_usuarios").value;

        const nombre =
            document.getElementById("nombre")
            .value
            .trim();

        const correo =
            document.getElementById("correo")
            .value
            .trim();

        const idCurso =
            document.getElementById("id_curso")
            .value;

        const rol =
            document.getElementById("rol")
            .value;

        const alumno = {

            id:
              id || generarID("ultimoIDAlumno"),
            nombre:
              nombre,

            correo:
              correo,

            idCurso:
              idCurso,

            rol:
              rol

        };

        /*
        EDITAR
        */

        if(id){

            alumnos =
                alumnos.map(a =>
                    a.id == id
                    ? alumno
                    : a
                );

        } else {

            /*
            CREAR
            */

            alumnos.push(alumno);

        }

        guardarDatos();

        formulario.reset();

        document.getElementById(
            "id_usuarios"
        ).value = "";

        mostrarAlumnos();

    });

    /*
    MOSTRAR TABLA
    */

    function mostrarAlumnos(){

        tabla.innerHTML = "";

        alumnos.forEach(alumno => {

            tabla.innerHTML += `

            <tr>

                <td>${alumno.id}</td>

                <td>${alumno.nombre}</td>

                <td>
                    ${alumno.correo}
                    <br>
                    Curso ID:
                    ${alumno.idCurso}
                </td>

                <td>
                    <span class="badge text-bg-success">
                        Activo
                    </span>
                </td>

                <td>

                    <button
                        class="btn btn-sm btn-info"
                        onclick="editarAlumno(${alumno.id})">

                        Editar

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="eliminarAlumno(${alumno.id})">

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
            "alumnos",
            JSON.stringify(alumnos)
        );

    }

    /*
    HACER FUNCIONES GLOBALES
    */

    window.editarAlumno = (id) => {

        const alumno =
            alumnos.find(a => a.id == id);

        document.getElementById(
            "id_usuarios"
        ).value = alumno.id;

        document.getElementById(
            "nombre"
        ).value = alumno.nombre;

        document.getElementById(
            "correo"
        ).value = alumno.correo;

        document.getElementById(
            "id_curso"
        ).value = alumno.idCurso;

    };

    window.eliminarAlumno = (id) => {

        alumnos =
            alumnos.filter(
                a => a.id != id
            );

        guardarDatos();

        mostrarAlumnos();

    };

});