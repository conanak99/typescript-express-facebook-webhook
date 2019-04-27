import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
dotenv.config()

import { Root } from './types'
import { processHook } from './hookProcessor'
import { getPageToken } from './api/facebook'

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

app.post('/webhook', (req, res) => {
    const hookObject = req.body as Root
    processHook(hookObject) // YOLO, no await log
    res.status(200).send("OK")
});

// Go to the Graph API Explorer.
// Select the application you want to get the access token for 
// (in the "Application" drop-down menu, not the "My Apps" menu).
// Click "Get Token" > "Get User Access Token".
// In the pop-up, under the "Extended Permissions" tab, check "manage_pages" and "publish_page".
// Click "Get Access Token"
app.get('/getToken', async (req, res) => {
    const exchangeToken = req.query.exchangeToken
    const pageToken = await getPageToken(exchangeToken)
    res.json({...pageToken, toDo: 'Copy the token into .env'})
})

app.listen(3000, function () {
  console.log('Hello from port 3000!');
});