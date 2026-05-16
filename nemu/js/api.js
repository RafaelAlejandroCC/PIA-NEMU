const API_URL = "http://localhost:3000"; // URL que usará tu compañero

async function guardarEnDB(endpoint, datos) {
    try {
        // Por ahora lo guardamos en consola y localStorage para que sigas probando
        console.log(`Enviando a ${endpoint}:`, datos);
        
        // Cuando tu compañero esté listo, el activará esta parte:
        /*
        const response = await fetch(`${API_URL}/${endpoint}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(datos)
        });
        return await response.json();
        */
        
        return { status: "success", mensaje: "Datos listos para SQL" };
    } catch (error) {
        console.error("Error de conexión", error);
    }
}