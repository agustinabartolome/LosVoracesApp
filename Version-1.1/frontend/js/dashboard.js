async function getUserData() {
  try {
    const res = await fetch('https:///auth/me', {
      credentials: 'include'
    });

    if (!res.ok) {
      window.location.href = 'login.html';
      return;
    }

    const user = await res.json();
    document.getElementById('username').textContent = user.username;
    document.getElementById('role-info').textContent = `Rol: ${user.role}`;

    // Ocultar gestión si no es owner
    if (user.role !== 'owner') {
      document.getElementById('management-section').style.display = 'none';
    }
  } catch (err) {
    console.error('Error al obtener el usuario:', err);
    window.location.href = 'login.html';
  }
}

async function logout() {
  await fetch('https:///auth/logout', {
    method: 'GET',
    credentials: 'include'
  });
  window.location.href = 'login.html';
}

getUserData();