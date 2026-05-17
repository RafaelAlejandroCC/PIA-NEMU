document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("loginForm");

    if (!formulario) return;

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const datos = {
            email: document.getElementById("email").value.trim(),
            password: document.getElementById("password").value,
            rol: document.getElementById("rol").value
        };

        try {
            const respuesta = await apiRequest("login.php", {
                method: "POST",
                body: JSON.stringify(datos)
            });

            localStorage.setItem("usuarioActual", JSON.stringify(respuesta.usuario));

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
