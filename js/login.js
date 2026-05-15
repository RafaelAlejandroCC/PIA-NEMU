document.addEventListener("DOMContentLoaded", () => {

    const formulario =
        document.getElementById("loginForm");

    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

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

        const loginData = {

            email: email,

            password: password,

            rol: rol,

            fechaLogin:
                new Date().toISOString()

        };

        console.log(
            "Datos de login:",
            loginData
        );

        /*
        SESIÓN TEMPORAL
        */

        localStorage.setItem(
            "usuarioActual",
            JSON.stringify(loginData)
        );

        /*
        REDIRECCIÓN
        SEGÚN EL ROL
        */

        if (rol === "maestro") {

            window.location.href =
                "dashboard-maestro.html";

            return;
        }

        if (rol === "alumno") {

            window.location.href =
                "dashboard-alumno.html";

            return;
        }

        /*
        SEGURIDAD EXTRA
        */

        alert("Rol inválido");

    });

});