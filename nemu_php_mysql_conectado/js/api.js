const API_BASE = "../php";

async function apiRequest(endpoint, options = {}) {
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        ...options
    };

    const respuesta = await fetch(`${API_BASE}/${endpoint}`, config);

    let datos;
    try {
        datos = await respuesta.json();
    } catch (error) {
        throw new Error("El servidor no devolvió JSON válido.");
    }

    if (!respuesta.ok || datos.ok === false) {
        throw new Error(datos.mensaje || "Error en la petición.");
    }

    return datos;
}

function mostrarError(error) {
    console.error(error);
    alert(error.message || "Ocurrió un error inesperado.");
}
