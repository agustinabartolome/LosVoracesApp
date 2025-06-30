const isLocalhost = window.location.hostname === 'localhost';

const BACKEND_URL = isLocalhost
  ? 'http://localhost:3000'
  : 'https://.onrender.com';

