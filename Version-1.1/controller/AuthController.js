const User = require('../model/User');
const jwt = require('jsonwebtoken');

async function register(req, res) {
  try {
    const { username, password, role } = req.body;


    if (!username || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son obligatorios' });
    }


    const user = new User({ username, password, role });
    await user.save();

    res.status(201).json({ message: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error en register:', error);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
}


async function login(req, res) {
  try {
    const { username, password } = req.body;

 
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

 
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token, user: { username: user.username, role: user.role } });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
}

module.exports = {
  register,
  login
};
