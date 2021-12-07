const express = require('express');
const app = express();
const events = require('./routes/events');
var cors = require('cors');
const PORT = 5000;

app.use(cors());
app.use('/api/events', events);

app.listen(PORT, () => {
  console.log(`Server Listening at http://localhost:${PORT}`);
});
