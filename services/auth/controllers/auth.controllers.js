const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

exports.register = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email })

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User({
      email,
      password: hashedPassword
    })

    await newUser.save()
    return res.status(201).json({
      message: 'Register exitoso',
      redirect: '/index.html' // o donde sea que quieras llevar al usuario
    })
  } catch (error) {
    console.error('Error registering user:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

exports.login = async (req, res) => {
  const { email, password } = req.body

  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }

    const usuario = await User.findOne({ email })
    if (!usuario) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const isMatch = await bcrypt.compare(password, usuario.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign(
      {
        userId: usuario._id,
        email: usuario.email,
        role: usuario.role
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    )

    if (usuario.role === 'admin') {
      return res.status(200).json({
        message: 'Login exitoso',
        token,
        usuario,
        redirect: '/pages/admin.html' // Redirigir al administrador
      })
    } else {
      return res.status(200).json({
        message: 'Login exitoso',
        token,
        usuario,
        redirect: '/pages/client.html'
      })
    }
  } catch (error) {
    console.error('Error logging in user:', error)
    res.status(500).json({ message: 'Server error' })
  }
}
