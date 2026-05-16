document.addEventListener("DOMContentLoaded", () => {

    const formulario = document.getElementById("registro");

    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {

        e.preventDefault();

        const nombre = document.getElementById("nombreUsuario").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const rol = document.getElementById("rol").value;

        /*
        OBJETO PREPARADO
        PARA BACKEND / DATABASE
        Usando exactamente: nombre, email, password
        */
        const registroData = {
            id: Math.floor(Math.random() * 10000) + 1, // ID temporal para control
            nombre: nombre,
            email: email,
            password: password,
            rol: rol,
            fechaRegistro: new Date().toISOString()
        };

        console.log("Datos de registro:", registroData);

        // ==========================================================
        // NUEVO: GUARDAR EN LA BASE DE DATOS LOCAL GLOBAL
        // Esto hace que el Login pueda encontrar a este usuario después
        // ==========================================================
        let baseUsuarios = JSON.parse(localStorage.getItem("alumnos")) || [];
        
        // Evitamos que se registre el mismo correo dos veces de forma local
        const yaExiste = baseUsuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
        if (yaExiste) {
            alert("Error: Este correo electrónico ya está registrado.");
            return;
        }

        baseUsuarios.push(registroData);
        localStorage.setItem("alumnos", JSON.stringify(baseUsuarios));
        // ==========================================================

        /*
        SESIÓN TEMPORAL 
        (Guarda quién está logueado actualmente)
        */
        localStorage.setItem("usuarioActual", JSON.stringify(registroData));

        alert("¡Registro exitoso! Iniciando sesión automáticamente...");

        /*
        REDIRECCIÓN
        SEGÚN EL ROL
        */
        if (rol === "alumno") {
            window.location.href = "dashboard-alumno.html";
            return;
        }

        if (rol === "maestro") {
            window.location.href = "dashboard-maestro.html";
            return;
        }

        /*
        SEGURIDAD EXTRA
        */
        alert("Rol inválido");
    });
});