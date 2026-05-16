document.addEventListener("DOMContentLoaded", () => {

    const usuarioGuardado =
        localStorage.getItem("usuarioActual");

    if(!usuarioGuardado){

        window.location.href =
            "login.html";

        return;
    }

    const usuario =
        JSON.parse(usuarioGuardado);

    const bienvenidaAlumno =
        document.getElementById(
            "dashboardAlumno"
        );

    const bienvenidaMaestro =
        document.getElementById(
            "dashboardMaestro"
        );

    if(bienvenidaAlumno){

        bienvenidaAlumno.textContent =
            "Bienvenido, " +
            (usuario.nombre || usuario.email);

    }

    if(bienvenidaMaestro){

        bienvenidaMaestro.textContent =
            "Bienvenido, " +
            (usuario.nombre || usuario.email ) ;

    }

});