const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const PORT = process.env.PORT || 5000;
const cors = require("cors");

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(express.static('public'));
app.use('/api', notesRoutes);

app.listen(PORT, console.log(`Server started on port ${PORT}`));
