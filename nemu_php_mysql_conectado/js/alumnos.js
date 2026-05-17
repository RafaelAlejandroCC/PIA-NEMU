document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formAlumnos");
    const tabla = document.getElementById("tablaAlumnos");

    if (!formulario || !tabla) return;

    cargarUsuarios();

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const id = document.getElementById("id_usuarios").value;

        const datos = {
            id_usuario: Number(id),
            nombre: document.getElementById("nombre").value.trim(),
            email: document.getElementById("correo").value.trim(),
            password: document.getElementById("password_registro").value,
            rol: document.getElementById("rol").value,
            activo: 1
        };

        try {
            const endpoint = "usuarios.php";
            const metodo = id ? "PUT" : "POST";

            const respuesta = await apiRequest(endpoint, {
                method: metodo,
                body: JSON.stringify(datos)
            });

            alert(respuesta.mensaje);
            formulario.reset();
            document.getElementById("id_usuarios").value = "";
            cargarUsuarios();
        } catch (error) {
            mostrarError(error);
        }
    });

    async function cargarUsuarios() {
        try {
            const respuesta = await apiRequest("usuarios.php");
            pintarUsuarios(respuesta.usuarios);
        } catch (error) {
            mostrarError(error);
        }
    }

    function pintarUsuarios(usuarios) {
        tabla.innerHTML = "";

        if (usuarios.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5" class="text-center text-muted">No hay usuarios registrados.</td></tr>`;
            return;
        }

        usuarios.forEach(usuario => {
            tabla.innerHTML += `
                <tr>
                    <td><strong>#${usuario.id_usuario}</strong></td>
                    <td><span class="fw-bold text-info">${usuario.nombre}</span></td>
                    <td>${usuario.email}</td>
                    <td><span class="badge bg-secondary">${usuario.rol.toUpperCase()}</span></td>
                    <td>
                        <button class="btn btn-sm btn-info me-1"
                            onclick='editarAlumno(${JSON.stringify(usuario)})'>Editar</button>
                        <button class="btn btn-sm btn-danger"
                            onclick="eliminarAlumno(${usuario.id_usuario})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    }

    window.editarAlumno = (usuario) => {
        document.getElementById("id_usuarios").value = usuario.id_usuario;
        document.getElementById("nombre").value = usuario.nombre;
        document.getElementById("correo").value = usuario.email;
        document.getElementById("password_registro").value = "";
        document.getElementById("rol").value = usuario.rol;
        document.getElementById("nombre").focus();
    };

    window.eliminarAlumno = async (id) => {
        if (!confirm(`¿Eliminar el usuario #${id}?`)) return;

        try {
            const respuesta = await apiRequest(`usuarios.php?id=${id}`, {
                method: "DELETE"
            });

            alert(respuesta.mensaje);
            cargarUsuarios();
        } catch (error) {
            mostrarError(error);
        }
    };
});
