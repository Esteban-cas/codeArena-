require('dotenv').config()
const app = require('./src/app')
const connectDB = require('./shared/config/db')

const PORT = process.env.PORT || 3000

// Start the server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error.message)
    process.exit(1)
  })
