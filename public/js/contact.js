function enviarFormulario() {
    const form = event.target;
    fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
    }).then(response => {
        if (response.ok) {
            alert("Mensaje enviado correctamente.");
            form.reset();
        } else {
            alert("Hubo un error al enviar el mensaje.");
        }
    });
}