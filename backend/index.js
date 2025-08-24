const express = require('express');
const bodyParser = require('body-parser');
const session = require('./session');


const app = express();
app.use(bodyParser.json());


app.post('/api/session/submit', session.submitReplay);
app.get('/api/leaderboard', session.getLeaderboard);


app.listen(3000, () => console.log('Backend running on http://localhost:3000'));
