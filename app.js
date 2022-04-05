const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


//ROTAS
const indexRoute = require("./Routes/index");
const userRoute = require("./Routes/user");
const agendamentoRoute = require("./Routes/agendamento");






const env = require("./config/config");

const url = env.bdString;
const options = {  useNewUrlParser: true};

mongoose.connect(url, options);
//mongoose.set('useCreateIndex', true);


mongoose.connection.on('error', (err) => {
    console.log('Erro na concexão com banco de dados: ' + err);
});

mongoose.connection.on('disconnected', () => {
    console.log('Desconectado do banco de dados.');
});


mongoose.connection.on('connected', () => {
    console.log('Conexão realizada com sucesso !');
});


//BODY PARSER
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//mongodb+srv://deoz_user:<password>@cluster0.7lcvj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

//ROTAS
app.use('/', indexRoute);
app.use('/users', userRoute);
app.use('/agendamento', agendamentoRoute);





app.listen(2022)

module.exports = app;



/*
 * 200 - Ok !
 * 201 - Created !
 * 202 - Accepted !
 * 
 * 400 - Bad Request !
 * 401 - Unauthorized ! (AUTENTICAÇÃO, tem carater temporario)
 * 403 - Forbidden ! (AUTORIZAÇÃO, tem carater permanente)
 * 404 - Not Found !
 * 
 * 500 - Internal Server Error !
 * 501 - Not Implemented !
 * 503 - Service Unavaliable
 * 
 * 
 * 
 * 
 * 
 * */