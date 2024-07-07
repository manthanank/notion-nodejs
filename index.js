const express = require('express');
const notesRoutes = require('./routes/notesRoutes');
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const bodyParser = require('body-parser');

const app = express();

app.use(
    cors({
        origin: "*",
    })
);

app.use(bodyParser.json());
app.use('/api', notesRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Notes API!');
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
