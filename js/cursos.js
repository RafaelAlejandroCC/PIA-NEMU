function generarIDCurso(){

    let ultimoID =
        Number(
            localStorage.getItem(
                "ultimoIDCurso"
            )
        ) || 0;

    ultimoID++;

    localStorage.setItem(
        "ultimoIDCurso",
        ultimoID
    );

    return String(
        ultimoID
    ).padStart(3, "0");

}

document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("formCursos");

    const tabla =
        document.getElementById("tablaCursos");

    let cursos =
        JSON.parse(
            localStorage.getItem("cursos")
        ) || [];

    mostrarCursos();

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const id =
            document.getElementById("id_cursos").value;

        const nombre =
            document.getElementById("nombre")
            .value
            .trim();

        const descripcion =
            document.getElementById("descripcion")
            .value
            .trim();

        const idMaestro =
            document.getElementById("id_maestro")
            .value;

        const curso = {

            id:
              id || generarIDCurso(),

            nombre:
              nombre,

            descripcion:
              descripcion,

            idMaestro:
              idMaestro,

            estado:
              "Activo"

        };

        /*
        EDITAR
        */

        if(id){

            cursos =
                cursos.map(c =>
                    c.id == id
                    ? curso
                    : c
                );

        } else {

            /*
            CREAR
            */

            cursos.push(curso);

        }

        guardarDatos();

        formulario.reset();

        document.getElementById(
            "id_cursos"
        ).value = "";

        mostrarCursos();

    });

    /*
    MOSTRAR CURSOS
    */

    function mostrarCursos(){

        tabla.innerHTML = "";

        cursos.forEach(curso => {

            tabla.innerHTML += `

            <tr>

                <td>${curso.id}</td>

                <td>
                    ${curso.nombre}
                </td>

                <td>

                    ${curso.descripcion}

                    <br>

                    Maestro ID:
                    ${curso.idMaestro}

                </td>

                <td>

                    <span class="badge text-bg-success">

                        ${curso.estado}

                    </span>

                </td>

                <td>

                    <button
                        class="btn btn-sm btn-info"
                        onclick="editarCurso(${curso.id})">

                        Editar

                    </button>

                    <button
                        class="btn btn-sm btn-danger"
                        onclick="eliminarCurso(${curso.id})">

                        Eliminar

                    </button>

                </td>

            </tr>

            `;

        });

    }

    /*
    GUARDAR DATOS
    */

    function guardarDatos(){

        localStorage.setItem(
            "cursos",
            JSON.stringify(cursos)
        );

    }

    /*
    EDITAR
    */

    window.editarCurso = (id) => {

        const curso =
            cursos.find(c => c.id == id);

        document.getElementById(
            "id_cursos"
        ).value = curso.id;

        document.getElementById(
            "nombre"
        ).value = curso.nombre;

        document.getElementById(
            "descripcion"
        ).value = curso.descripcion;

        document.getElementById(
            "id_maestro"
        ).value = curso.idMaestro;

    };

    /*
    ELIMINAR
    */

    window.eliminarCurso = (id) => {

        cursos =
            cursos.filter(
                c => c.id != id
            );

        guardarDatos();

        mostrarCursos();

    };

});