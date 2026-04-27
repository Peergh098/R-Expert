const jwt = require('jsonwebtoken');

const generateToken = (payload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

const login = (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const adminEmail = (process.env.ADMIN_EMAIL || '').toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || '';

    if (email.toLowerCase() !== adminEmail || password !== adminPassword) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken({ id: 'admin', email: adminEmail, role: 'admin' });
    res.json({
      token,
      user: { id: 'admin', email: adminEmail, name: 'Admin', role: 'admin' },
    });
  } catch (err) {
    next(err);
  }
};

const getMe = (req, res) => {
  res.json({
    user: { id: 'admin', email: req.user.email, name: 'Admin', role: 'admin' },
  });
};

module.exports = { login, getMe };
