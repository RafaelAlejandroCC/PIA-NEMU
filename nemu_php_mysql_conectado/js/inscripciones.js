document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formInscripciones");
    const tabla = document.getElementById("tablaInscripciones");

    if (!formulario || !tabla) return;

    cargarInscripciones();

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("id_inscripciones").value;

        const datos = {
            id_inscripcion: Number(id),
            id_alumno: Number(document.getElementById("id_alumno").value),
            id_curso: Number(document.getElementById("id_curso").value),
            estado: document.getElementById("estado").value
        };

        try {
            const metodo = id ? "PUT" : "POST";

            const respuesta = await apiRequest("inscripciones.php", {
                method: metodo,
                body: JSON.stringify(datos)
            });

            alert(respuesta.mensaje);
            formulario.reset();
            document.getElementById("id_inscripciones").value = "";
            cargarInscripciones();
        } catch (error) {
            mostrarError(error);
        }
    });

    async function cargarInscripciones() {
        try {
            const respuesta = await apiRequest("inscripciones.php");
            pintarInscripciones(respuesta.inscripciones);
        } catch (error) {
            mostrarError(error);
        }
    }

    function pintarInscripciones(inscripciones) {
        tabla.innerHTML = "";

        if (inscripciones.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay inscripciones registradas.</td></tr>`;
            return;
        }

        inscripciones.forEach(inscripcion => {
            tabla.innerHTML += `
                <tr>
                    <td><strong>#${inscripcion.id_inscripcion}</strong></td>
                    <td>${inscripcion.alumno}<br><small>ID Alumno: ${inscripcion.id_alumno}</small></td>
                    <td>${inscripcion.curso}<br><small>ID Curso: ${inscripcion.id_curso}</small></td>
                    <td><span class="badge text-bg-success">${inscripcion.estado}</span></td>
                    <td>
                        <button class="btn btn-sm btn-info me-1"
                            onclick='editarInscripcion(${JSON.stringify(inscripcion)})'>Editar</button>
                        <button class="btn btn-sm btn-danger"
                            onclick="eliminarInscripcion(${inscripcion.id_inscripcion})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    window.editarInscripcion = (inscripcion) => {
        document.getElementById("id_inscripciones").value = inscripcion.id_inscripcion;
        document.getElementById("id_alumno").value = inscripcion.id_alumno;
        document.getElementById("id_curso").value = inscripcion.id_curso;
        document.getElementById("estado").value = inscripcion.estado;
    };

    window.eliminarInscripcion = async (id) => {
        if (!confirm(`¿Eliminar la inscripción #${id}?`)) return;

        try {
            const respuesta = await apiRequest(`inscripciones.php?id=${id}`, {
                method: "DELETE"
            });

            alert(respuesta.mensaje);
            cargarInscripciones();
        } catch (error) {
            mostrarError(error);
        }
    };
});
