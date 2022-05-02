//this code is my sketch for study in understanding about webhook // 
// este código é meu esboço para entendimento de webhook // 
// não tente rodar  // 
// don't run this code // 

const express = require('express');
const app = express();

let bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('public'));

app.get('/', function (request, response) {
    response.send("Teste");
});

const {google} = require('googleapis');
const calendarId = "adicionar o id do google calender"
const serviceAccount = 'adicionar arquivo json do google calendário'
const timeZoneOffset = '-03:00';

const serviceAccountAuth = new google.auth.JWT({
    email: serviceAccount.client_email,
    key: serviceAccount.private_key,
    scopes: 'https://www.googleapis.com/auth/calendar'
})

const calendar = google.calendar('v3');

const mysql = require("mysql");
const MYSQL_HOST = process.env.MYSQL_HOST
const MYSQL_USER = process.env.MYSQL_USER
const MYSQL_PASS = process.env.MYSQL_PASS
const MYSQL_DB = process.env.MYSQL_DB

app.post("/nomedoagente", function (request, response) {

    let intentName = request.body.queryResult.intent.displayName;

    if (intentName === "agendamento") {
        let nome = request.body.queryResult.parameters['nome-cliente'];
        let fone = request.body.queryResult.parameters['fone-cliente'];

        let sql_query = "insert into clientes values ('" + nome + "', '" + fone + "')";
        let connection = mysql.createConnection({
            host: MYSQL_HOST,
            user: MYSQL_USER,
            password: MYSQL_PASS,
            database: MYSQL_DB
        });
        connection.connect()
        connection.query(sql_query, function (error, results, fields) {
            if (error) throw error;
            connection.end();
            response.json({ "fulfillmentText": "Seus dados foram salvos com sucesso, quer agendar neste momento?" })
        });
    }else if (intentName === "nome do intent - para followup yes") {

        let cliente = request.body.queryResult.outputContexts[1].parameters['nome-cliente'];
        let tipo =  request.body.queryResult.outputContexts[1].parameters['tipo'];
        let servico = request.body.queryResult.outputContexts[1].parameters['servico'];
        let data = request.body.queryResult.outputContexts[1].parameters['data'];
        let hora = request.body.queryResult.outputContexts[1].parameters['hora'];

        const dateTimeStart = new Date(Date.parse(data.split('T')[0] + 'T' + hora.split('T')[1].split('-')[0] + timeZoneOffset));
        const dateTimeEnd = new Date(new Date(dateTimeStart).setHours(dateTimeStart.getHours() + 1));
        const agendamentoString = formatData(new Date(data.split('T')[0]))+ " as "+hora.split('T')[1].split('-')[0];

        return criarEventoCalendario(dateTimeStart, dateTimeEnd, servico,tipo,cliente).then(() => {
            let mensagem = `Excelente, seu serviço esta agendado para ${agendamentoString} `;
            console.log(mensagem);
            response.json({"fulfillmentText":mensagem});
          }).catch(() => {
            let mensagem = `Desculpe, não temos mais vaga para ${agendamentoString}.`;
            console.log(mensagem);
            response.json({"fulfillmentText":mensagem});
          });
    }
});

var port = process.env.PORT || 3000;


function formatData(date) {
    var nomeMes = [
      "Janeiro", "Fevereiro", "Março",
      "Abril", "Maio", "Junho", "Julho",
      "Agosto", "Setembro", "Outubro",
      "Novembro", "Dezembro"
    ];
  
    var dia = date.getDate();
    var mesIndex = date.getMonth();
    var ano = date.getFullYear();
  
    return dia + ' ' + nomeMes[mesIndex] + ' ' + ano;
}

const listener = app.listen(port, function () {
    console.log("Sua aplicação está na porta: " + listener.address().port);
});
