document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("registro");

    if (!formulario) return;

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = {
            nombre: document.getElementById("nombreUsuario").value.trim(),
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            rol: document.getElementById("rol").value
        };

        try {
            const respuesta = await apiRequest("registro.php", {
                method: "POST",
                body: JSON.stringify(datos)
            });

            localStorage.setItem("usuarioActual", JSON.stringify(respuesta.usuario));
            alert(respuesta.mensaje);

            if (respuesta.usuario.rol === "maestro") {
                window.location.href = "dashboard-maestro.html";
            } else {
                window.location.href = "dashboard-alumno.html";
            }
        } catch (error) {
            mostrarError(error);
        }
    });
});
