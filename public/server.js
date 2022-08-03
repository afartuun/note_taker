//imports
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3333;
const path = require('path');


const note_routes = require('./routes/api_routes');


app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);


//static file
app.use(express.static(path.join(__dirname,'public')));

app.use(express.json());

app.use('/api', api_routes);

app.listen(PORT, () =>
  console.log(`listening on port ${PORT}`)
);
