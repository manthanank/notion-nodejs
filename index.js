const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.static('public'));
app.use('/api', notesRoutes);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
