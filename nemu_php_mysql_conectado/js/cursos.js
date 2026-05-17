document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formCursos");
    const tabla = document.getElementById("tablaCursos");

    if (!formulario || !tabla) return;

    cargarCursos();

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("id_cursos").value;

        const datos = {
            id_curso: Number(id),
            nombre: document.getElementById("nombre").value.trim(),
            descripcion: document.getElementById("descripcion").value.trim(),
            id_maestro: Number(document.getElementById("id_maestro").value),
            estado: "Activo"
        };

        try {
            const metodo = id ? "PUT" : "POST";

            const respuesta = await apiRequest("cursos.php", {
                method: metodo,
                body: JSON.stringify(datos)
            });

            alert(respuesta.mensaje);
            formulario.reset();
            document.getElementById("id_cursos").value = "";
            cargarCursos();
        } catch (error) {
            mostrarError(error);
        }
    });

    async function cargarCursos() {
        try {
            const respuesta = await apiRequest("cursos.php");
            pintarCursos(respuesta.cursos);
        } catch (error) {
            mostrarError(error);
        }
    }

    function pintarCursos(cursos) {
        tabla.innerHTML = "";

        if (cursos.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay cursos registrados.</td></tr>`;
            return;
        }

        cursos.forEach(curso => {
            tabla.innerHTML += `
                <tr>
                    <td><strong>#${curso.id_curso}</strong></td>
                    <td><span class="fw-bold text-info">${curso.nombre}</span></td>
                    <td>${curso.descripcion || ""}<br><span class="badge bg-secondary">Maestro: ${curso.maestro}</span></td>
                    <td><span class="badge text-bg-success">${curso.estado}</span></td>
                    <td>
                        <button class="btn btn-sm btn-info me-1"
                            onclick='editarCurso(${JSON.stringify(curso)})'>Editar</button>
                        <button class="btn btn-sm btn-danger"
                            onclick="eliminarCurso(${curso.id_curso})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    window.editarCurso = (curso) => {
        document.getElementById("id_cursos").value = curso.id_curso;
        document.getElementById("nombre").value = curso.nombre;
        document.getElementById("descripcion").value = curso.descripcion || "";
        document.getElementById("id_maestro").value = curso.id_maestro;
        document.getElementById("nombre").focus();
    };

    window.eliminarCurso = async (id) => {
        if (!confirm(`¿Eliminar el curso #${id}?`)) return;

        try {
            const respuesta = await apiRequest(`cursos.php?id=${id}`, {
                method: "DELETE"
            });

            alert(respuesta.mensaje);
            cargarCursos();
        } catch (error) {
            mostrarError(error);
        }
    };
});
