const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/', function(request, response){
    response.send("Teste");
});

var port =  process.env.PORT || 3000;
const listener = app.listen(port, function() {
    console.log("Sua aplicação está na porta: " + listener.address().port);
});
