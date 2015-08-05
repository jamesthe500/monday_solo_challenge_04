var express = require('express');
var path = require('path');
var app = express();
var people =require('./public//assets/data/people.json');
var index = require('./routes/index');

app.set('port', (process.env.PORT || 5000));

app.get('/data', function(req, res){
    res.json(people);
});

app.use('/', index);

app.listen(app.get('port'), function() {
    console.log('server listening on port: ' + app.get('port'));
});

