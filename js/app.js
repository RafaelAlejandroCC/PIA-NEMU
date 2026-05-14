function mostrarMensajePendiente(){
  alert("Esta acción está preparada para conectarse al CRUD posteriormente.");
}

function loginDemo(event){
  event.preventDefault();
  const rol = document.getElementById("rol").value;
  if(rol === "maestro"){
    window.location.href = "dashboard-maestro.html";
  }else{
    window.location.href = "dashboard-alumno.html";
  }
}

function registroDemo(event){
  event.preventDefault();
  alert("Registro preparado. Después se conectará a la base de datos.");
  window.location.href = "login.html";
}

function cerrarSesion(){
  window.location.href = "index.html";
}
