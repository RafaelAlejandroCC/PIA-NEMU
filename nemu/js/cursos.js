// Función para generar IDs secuenciales (001, 002, 003...)
function generarIDCurso() {
    let ultimoID = Number(localStorage.getItem("ultimoIDCurso")) || 0;
    ultimoID++;
    localStorage.setItem("ultimoIDCurso", ultimoID);
    return String(ultimoID).padStart(3, "0");
}

document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formCursos");
    const tabla = document.getElementById("tablaCursos");

    if (!formulario || !tabla) return;

    // Cargar cursos desde localStorage como respaldo temporal
    let cursos = JSON.parse(localStorage.getItem("cursos")) || [];
    mostrarCursos();

    // Evento del botón Guardar (Submit)
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idExistente = document.getElementById("id_cursos").value;
        const nombre = document.getElementById("nombre").value.trim();
        const descripcion = document.getElementById("descripcion").value.trim();
        const idMaestro = document.getElementById("id_maestro").value;

        // Estructura idéntica a las columnas que espera tu base de datos SQL
        const datosCurso = {
            nombre: nombre,
            descripcion: descripcion,
            id_maestro: idMaestro ? parseInt(idMaestro) : null
        };

        if (idExistente) {
            /* === MODO EDICIÓN === */
            const index = cursos.findIndex(c => c.id == idExistente);
            if (index !== -1) {
                cursos[index] = { 
                    id: idExistente, 
                    nombre: datosCurso.nombre, 
                    descripcion: datosCurso.descripcion, 
                    idMaestro: datosCurso.id_maestro 
                };
                alert("Curso actualizado con éxito.");
            }
        } else {
            /* === MODO CREACIÓN === */
            // Generamos un ID de JS válido y visible para tus inscripciones
            const nuevoCurso = {
                id: generarIDCurso(),
                nombre: datosCurso.nombre,
                descripcion: datosCurso.descripcion,
                idMaestro: datosCurso.id_maestro
            };

            cursos.push(nuevoCurso);

            // Avisamos al puente api.js en la consola por si quieren registrar la petición
            if (typeof guardarEnDB === "function") {
                await guardarEnDB("cursos", datosCurso);
            }
            alert("Curso registrado con éxito.");
        }

        // Guardar en el disco local, resetear formulario y refrescar la tabla
        localStorage.setItem("cursos", JSON.stringify(cursos));
        formulario.reset();
        document.getElementById("id_cursos").value = "";
        mostrarCursos();
    });

    // Función para pintar la tabla dinámicamente
    function mostrarCursos() {
        tabla.innerHTML = "";

        if (cursos.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay cursos registrados.</td></tr>`;
            return;
        }

        cursos.forEach(curso => {
            tabla.innerHTML += `
            <tr>
                <td><strong>#${curso.id}</strong></td>
                <td><span class="fw-bold text-info">${curso.nombre}</span></td>
                <td>${curso.descripcion}</td>
                <td><span class="badge bg-secondary">Maestro ID: ${curso.idMaestro}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="editarCurso('${curso.id}')">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarCurso('${curso.id}')">Eliminar</button>
                </td>
            </tr>
            `;
        });
    }

    /* === FUNCIONES GLOBALES PARA LOS BOTONES DE CADA FILA === */
    window.editarCurso = (id) => {
        const curso = cursos.find(c => c.id == id);
        if (!curso) return;

        document.getElementById("id_cursos").value = curso.id;
        document.getElementById("nombre").value = curso.nombre;
        document.getElementById("descripcion").value = curso.descripcion;
        document.getElementById("id_maestro").value = curso.idMaestro;
        
        document.getElementById("nombre").focus();
    };

    window.eliminarCurso = (id) => {
        if (confirm(`¿Estás seguro de eliminar el curso #${id}?`)) {
            cursos = cursos.filter(c => c.id != id);
            localStorage.setItem("cursos", JSON.stringify(cursos));
            mostrarCursos();
        }
    };
});