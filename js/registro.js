document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("registro");

    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const nombre =
            document.getElementById("nombreUsuario")
            .value
            .trim();

        const email =
            document.getElementById("email")
            .value
            .trim();

        const password =
            document.getElementById("password")
            .value;

        const rol =
            document.getElementById("rol")
            .value;

        /*
        OBJETO PREPARADO
        PARA BACKEND / DATABASE
        */

        const registroData = {

            nombre: nombre,

            email: email,

            password: password,

            rol: rol,

            fechaRegistro:
                new Date().toISOString()

        };

        console.log(
            "Datos de registro:",
            registroData
        );

        /*
        SESIÓN TEMPORAL
        */

        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(registroData)
        );

        /*
        REDIRECCIÓN
        SEGÚN EL ROL
        */

        if (rol === "alumno") {

            window.location.href =
                "dashboard-alumno.html";

            return;
        }

        if (rol === "maestro") {

            window.location.href =
                "dashboard-maestro.html";

            return;
        }

        /*
        SEGURIDAD EXTRA
        */

        alert("Rol inválido");

    });

});