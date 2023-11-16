function submitForm(event) {
  event.preventDefault();
  
  const form = document.getElementById('consultaForm');
  const formData = new FormData(form);

  fetch('/submit', {
    method: 'POST',
    body: formData,
  })
  .then(response => response.text())
  .then(message => {
    alert(message);
    form.reset();
  })
  .catch(error => console.error('Erro ao enviar formulário:', error));
}
