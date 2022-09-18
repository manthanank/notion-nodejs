const express = require('express')
const getNotes = require('./services/notion')
const PORT = process.env.PORT || 5000

const app = express()

app.use(express.static('public'))

app.get('/notes', async (req, res) => {
  const notes = await getNotes()
  res.json(notes)
})

app.listen(PORT, console.log(`Server started on port ${PORT}`))
