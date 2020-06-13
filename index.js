const contactsRouter = require('./routers/contactsRouter');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();
 
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use('/api/contacts', contactsRouter);

app.get('/', (req, res) => res.send('Hello from API'));
app.listen(3000, () => console.log("Server is running on port", 3000));
