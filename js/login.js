document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("loginForm");

    if (!formulario) return;

    formulario.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailIngresado = document.getElementById("email").value.trim();
        const passwordIngresada = document.getElementById("password").value;
        const rolIngresado = document.getElementById("rol").value;

        // 1. Obtener los usuarios del localStorage
        const usuariosRegistrados = JSON.parse(localStorage.getItem("alumnos")) || [];

        // 2. Buscar coincidencia usando las variables requeridas (email, password)
        const usuarioValido = usuariosRegistrados.find(u => 
            u.email.toLowerCase() === emailIngresado.toLowerCase() && 
            u.password === passwordIngresada && 
            u.rol === rolIngresado
        );

        // === CUENTAS DEMO DE AUXILIO ===
        const cuentaDemoAdmin = (emailIngresado.toLowerCase() === "admin@nemu.com" && passwordIngresada === "12345" && rolIngresado === "maestro");
        const cuentaDemoAlumno = (emailIngresado.toLowerCase() === "alumno@nemu.com" && passwordIngresada === "12345" && rolIngresado === "alumno");

        // 3. Validar el acceso
        if (usuarioValido || cuentaDemoAdmin || cuentaDemoAlumno) {
            
            // Usamos la variable u.nombre o el nombre por defecto
            const nombreUsuario = usuarioValido ? usuarioValido.nombre : (rolIngresado === "maestro" ? "Profesor Maestro" : "Alumno Demo");

            const loginData = {
                nombre: nombreUsuario,
                email: emailIngresado,
                rol: rolIngresado,
                fechaLogin: new Date().toISOString()
            };

            // Almacenar sesión activa y dar la bienvenida
            localStorage.setItem("usuarioActual", JSON.stringify(loginData));
            alert("¡Inicio de sesión exitoso! Bienvenido " + loginData.nombre);

            // 4. Redirección de rutas
            if (rolIngresado === "maestro") {
                window.location.href = "dashboard-maestro.html";
            } else if (rolIngresado === "alumno") {
                window.location.href = "dashboard-alumno.html";
            }
            
        } else {
            alert("Error: Las credenciales son incorrectas, la contraseña no coincide o el rol es inválido.");
        }
    });
});