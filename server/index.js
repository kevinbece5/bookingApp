const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors')
const path = require('path')
const router = require('./routes');
const db = require('./db');
app.use(cors())
db.setup()
    .catch((err) => {
        console.log(err)
    })
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', express.static(path.resolve(__dirname, '../dist/')));
app.use(router)

app.listen(port, () => {
    console.log(`running on port ${port}`)
})