const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 80;
const path = require('path');
const db = require('./db');
const router = require('./routers');

//db connections
db.connect();

//middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());

//headers
app.use((res, req, next) => {
    res.header('Access-Control-Allow-Origin', "*")
    res.header('Access-Control-Allow-Headers', "*")
    next()
});

//api
app.use('/api', router);

//static resources
app.use('/upload', express.static(path.join(__dirname, '/../uploads')))
app.use(express.static(path.join(__dirname, "/../frontend/build")))

app.get('*', (req, res) => {
    try {
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    } catch (error) {
        res.send('error occured bsdk');
        console.log(error);
    }
})

//cors
app.use(cors());

//server listen
app.listen(PORT, () => {
    console.log(`Zcoder backend running on PORT ${PORT}`);
});