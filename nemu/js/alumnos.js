document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formAlumnos");
    const tabla = document.getElementById("tablaAlumnos");

    if (!formulario || !tabla) return;

    // Cargar usuarios desde localStorage y asegurar que ninguno rompa el código
    let alumnos = JSON.parse(localStorage.getItem("alumnos")) || [];
    
    // Protección: Si hay usuarios viejos sin contraseña, les ponemos una por defecto
    alumnos = alumnos.map(u => {
        if (!u.password) u.password = "12345";
        return u;
    });
    localStorage.setItem("alumnos", JSON.stringify(alumnos));
    
    mostrarAlumnos();

    // Evento del botón Guardar (Submit)
    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idExistente = document.getElementById("id_usuarios").value;
        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const passwordRegistro = document.getElementById("password_registro").value;
        const idCurso = document.getElementById("id_curso").value;
        const rol = document.getElementById("rol").value;

        // Estructura idéntica a las columnas de tu Base de Datos SQL
        const datosUsuario = {
            nombre: nombre,
            email: correo,
            password: passwordRegistro,
            rol: rol,
            id_curso: idCurso ? parseInt(idCurso) : null
        };

        if (idExistente) {
            /* MODO EDICIÓN */
            const index = alumnos.findIndex(a => a.id == idExistente);
            if (index !== -1) {
                alumnos[index] = { 
                    id: parseInt(idExistente), 
                    nombre: datosUsuario.nombre, 
                    correo: datosUsuario.email, 
                    password: datosUsuario.password, 
                    idCurso: datosUsuario.id_curso, 
                    rol: datosUsuario.rol 
                };
                alert("Usuario actualizado con éxito.");
            }
        } else {
            /* MODO CREACIÓN */
            const idSimulado = Math.floor(Math.random() * 10000) + 1;
            
            const nuevoUsuario = {
                id: idSimulado,
                nombre: datosUsuario.nombre,
                correo: datosUsuario.email,
                password: datosUsuario.password,
                idCurso: datosUsuario.id_curso,
                rol: datosUsuario.rol
            };

            alumnos.push(nuevoUsuario);

            if (typeof guardarEnDB === "function") {
                await guardarEnDB("usuarios", datosUsuario);
            }
            alert("Usuario registrado con éxito.");
        }

        // Guardar, resetear y pintar
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
        formulario.reset();
        document.getElementById("id_usuarios").value = "";
        mostrarAlumnos();
    });

    // Función para pintar la tabla dinámicamente
    function mostrarAlumnos() {
        tabla.innerHTML = "";

        if (alumnos.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay usuarios registrados.</td></tr>`;
            return;
        }

        alumnos.forEach(alumno => {
            tabla.innerHTML += `
            <tr>
                <td><strong>#${alumno.id}</strong></td>
                <td><span class="fw-bold text-info">${alumno.nombre}</span></td>
                <td>${alumno.correo}</td>
                <td><span class="badge bg-secondary">${alumno.rol.toUpperCase()} ${alumno.idCurso ? '(Curso: ' + alumno.idCurso + ')' : ''}</span></td>
                <td>
                    <button class="btn btn-sm btn-info me-1" onclick="editarAlumno(${alumno.id})">Editar</button>
                    <button class="btn btn-sm btn-danger" onclick="eliminarAlumno(${alumno.id})">Eliminar</button>
                </td>
            </tr>
            `;
        });
    }

    /* FUNCIONES GLOBALES */
    window.editarAlumno = (id) => {
        const alumno = alumnos.find(a => a.id == id);
        if (!alumno) return;

        document.getElementById("id_usuarios").value = alumno.id;
        document.getElementById("nombre").value = alumno.nombre;
        document.getElementById("email").value = alumno.correo;
        document.getElementById("password").value = alumno.password || "12345";
        document.getElementById("id_curso").value = alumno.idCurso || "";
        document.getElementById("rol").value = alumno.rol;
        
        document.getElementById("nombre").focus();
    };

    window.eliminarAlumno = (id) => {
        if (confirm(`¿Estás seguro de eliminar este registro #${id}?`)) {
            alumnos = alumnos.filter(a => a.id != id);
            localStorage.setItem("alumnos", JSON.stringify(alumnos));
            mostrarAlumnos();
        }
    };
});