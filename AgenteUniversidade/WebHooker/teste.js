const express = require("express");
const app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.get("/", function (request, response) {
  response.sendFile(__dirname + "/src/pages/index.hbs");
});

app.post("/vinicius-webhooker", function (request, response) {
  response.json({ fulfullmentText: "primeiro webwooker" });
});

const listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port" + listener.address().port);
});

