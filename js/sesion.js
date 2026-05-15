function cerrarSesion(){

    localStorage.removeItem(
        "usuarioActual"
    );

    sessionStorage.clear();

    window.location.href =
        "login.html";
}