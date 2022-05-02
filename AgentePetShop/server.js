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

const mysql

app.post("/nomedoagente", function(request, response){

    let intentName = request.body.queryResult.intent.displayName;

    if (intentName === "agendamento") {
        let nome = request.body.queryResult.parameters['nome-cliente'];
        let fone = request.body.queryResult.parameters['fone-cliente'];

        let sql_query = "insert into clientes values ('"+nome+"', '"+fone+"')";
    }
});

var port =  process.env.PORT || 3000;

const listener = app.listen(port, function() {
    console.log("Sua aplicação está na porta: " + listener.address().port);
});
