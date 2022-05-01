const express = require('express');
const app = express();

let bodyParser = require('body-parser')
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/', function(request, response){
    response.send("Teste");
});

app.post("/nomedoagente", function(request, response){

    let intentName = request.body.queryResult.intent.displayName;
});

var port =  process.env.PORT || 3000;

const listener = app.listen(port, function() {
    console.log("Sua aplicação está na porta: " + listener.address().port);
});
