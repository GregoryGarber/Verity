const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors())

const port = process.env.PORT || 8082;

app.get('/test', (req, res) => res.send('Test server!'));





app.listen(port, () => console.log(`Server running on port ${port}`));
module.exports = app;