// public/js/contact.js
// Este archivo maneja el envío del formulario de contacto usando Fetch API
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("form-contacto");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // 👈 Evita que el formulario se envíe y redirija
        enviarFormulario(event);
    });
});

function enviarFormulario(event) {
    const form = event.target;

    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            alert("Mensaje enviado correctamente.");
            form.reset(); // 👈 Limpia todos los inputs
        } else {
            alert("Hubo un error al enviar el mensaje.");
        }
    }).catch(error => {
        alert("Error de red: " + error.message);
    });
}
