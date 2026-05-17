document.addEventListener("DOMContentLoaded", async () => {
    const bienvenidaAlumno = document.getElementById("dashboardAlumno");
    const bienvenidaMaestro = document.getElementById("dashboardMaestro");
    const tablaAlumno = document.getElementById("tablaCursosAlumno");
    const tablaMaestro = document.getElementById("tablaCursosMaestro");

    try {
        const respuesta = await apiRequest("dashboard.php");
        const usuario = respuesta.usuario;

        localStorage.setItem("usuarioActual", JSON.stringify(usuario));

        if (bienvenidaAlumno) {
            bienvenidaAlumno.textContent = "Bienvenido, " + usuario.nombre;
        }

        if (bienvenidaMaestro) {
            bienvenidaMaestro.textContent = "Bienvenido, " + usuario.nombre;
        }

        if (tablaAlumno) {
            tablaAlumno.innerHTML = "";

            if (respuesta.cursos.length === 0) {
                tablaAlumno.innerHTML = `<tr><td colspan="5" class="text-center">No tienes cursos inscritos.</td></tr>`;
            }

            respuesta.cursos.forEach(curso => {
                tablaAlumno.innerHTML += `
                    <tr>
                        <td>${curso.id_curso}</td>
                        <td>${curso.nombre}</td>
                        <td>${curso.descripcion || ""}</td>
                        <td>${curso.maestro}</td>
                        <td><span class="badge text-bg-success">${curso.estado}</span></td>
                    </tr>
                `;
            });
        }

        if (tablaMaestro) {
            tablaMaestro.innerHTML = "";

            if (respuesta.cursos.length === 0) {
                tablaMaestro.innerHTML = `<tr><td colspan="4" class="text-center">No tienes cursos creados.</td></tr>`;
            }

            respuesta.cursos.forEach(curso => {
                tablaMaestro.innerHTML += `
                    <tr>
                        <td>${curso.id_curso}</td>
                        <td>${curso.nombre}</td>
                        <td>${curso.descripcion || ""}</td>
                        <td><span class="badge text-bg-success">${curso.estado}</span></td>
                    </tr>
                `;
            });
        }
    } catch (error) {
        alert("Debes iniciar sesión primero.");
        window.location.href = "login.html";
    }
});
