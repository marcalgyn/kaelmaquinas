//Carrega os Módulos
const express = require('express')
const handlebars = require('handlebars')
const expHandlebars = require('express-handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const bondyParser = require('body-parser')
const app = express()
const home = require("./routes/home")
const sobre = require("./routes/sobre")
const contato = require("./routes/contato")
const usuario = require("./routes/usuario")
const add_bd = require("./routes/add_bd")
const dashboard = require("./routes/dashboard")
const rodape = require("./routes/rodape")
const contato_info = require("./routes/contato_info")
const imagem = require("./routes/imagem")
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
const passport = require("passport")


require("./config/auth")(passport)



const path = require("path")

//Configuração
//Sessão
app.use(session({
    secret: 'marcalgyn',
    resave: true,
    saveUninitialized: true
}))

//Configurando o passport
app.use(passport.initialize())
app.use(passport.session())

//Formatar data
var helpers = require('handlebars-helpers')();
var Handlebars = require("handlebars");
var MomentHandler = require("handlebars.moment");
    MomentHandler.registerHelpers(Handlebars);

//Flash
app.use(flash())

//Middleware
app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg")
    res.locals.error_msg = req.flash("error_msg")
    res.locals.error = req.flash("error")
    res.locals.user = req.user || null
    next()
})

//BodyParser
app.use(bondyParser.urlencoded({ extended: false }))
app.use(bondyParser.json())

//Handlebars
/*
const hbs = expHandlebars.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(handlebars)
  });
*/
app.engine('handlebars', expHandlebars({
    defaultLayout: "main",
    extname: 'handlebars',
    handlebars: allowInsecurePrototypeAccess(handlebars)
}))
/*
app.engine("handlebars", handlebars({
    defaultLayout: "main",
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
        
    },
})
);
*/

app.set("view engine", "handlebars")

//Arquivos Estaticos
// app.use(express.static(path_join(__dirname, "public")))
app.use(express.static("public"))

//Conexao com o Banco de Dados
//mongoose.connect('mongodb://marcalgyn:a1a2a3a4@mongo_kaeldb:27017/kaeldb', {
mongoose.connect('mongodb://localhost:27017/kaeldb', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexao com banco de dados kaeldb realizado com sucesso ;) !!")
}).catch((erro) => {
    console.log("Erro Conexao ao banco Kaeldb, NÃO foi realizado com sucesso. " + erro)
})

//Rotas
app.use("/", home)
app.use("/sobre", sobre)
app.use("/contato", contato)
app.use("/usuario", usuario)
app.use("/add_bd", add_bd)
app.use("/dashboard", dashboard)
app.use("/rodape", rodape)
app.use("/contato-info", contato_info)
app.use("/imagem", imagem)



const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}!`);
})