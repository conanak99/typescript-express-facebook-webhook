import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'

// Create a new express application instance
const app: express.Application = express();
app.use(logger('dev'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.get('/webhook', function(req, res) {
    if (req.query['hub.verify_token'] === 'anh_hoang_dep_trai_vo_doi') {
        res.send(req.query['hub.challenge']);
        return;
    }
    res.send('Error, wrong validation token');
});

app.post('/webhook', async(req, res) => {
    const hookObject = req.body;
    console.log(JSON.stringify(hookObject, null, 2));

    res.status(200).send("OK");
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});