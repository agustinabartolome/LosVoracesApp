document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const role = document.getElementById('role').value;

  try {
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, role })
    });

    const data = await res.json();

    if (res.ok) {
      alert('Registro exitoso. Iniciá sesión.');
      window.location.href = 'login.html';
    } else {
      alert(data.error || 'Error al registrarse');
    }
  } catch (error) {
    console.error('Error en registro:', error);
    alert('Error en el servidor');
  }
});
