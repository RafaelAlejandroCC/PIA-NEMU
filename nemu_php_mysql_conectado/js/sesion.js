async function cerrarSesion() {
    try {
        await fetch("../php/logout.php");
    } catch (error) {
        console.error(error);
    }

    localStorage.removeItem("usuarioActual");
    sessionStorage.clear();
    window.location.href = "login.html";
}
