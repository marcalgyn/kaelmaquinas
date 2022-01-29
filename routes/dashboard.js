//Carrega os Modulos
const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

require("../models/Contato")
const Contato = mongoose.model("contato")
require("../models/Usuario")
const Usuarios = mongoose.model("usuario")

const { eAdmin } = require("../helpers/eAdmin")


router.get("/", eAdmin, (req, res) => {
    
//    res.render("dashboard/dashboard", { layout: 'adm.handlebars'})

    Contato.count().then((contato) => {
        Usuarios.count().then((usuario) =>{
            res.render("dashboard/dashboard", { layout: 'adm.handlebars', contato: contato, usuarios: usuario })
        })
    }).catch((erro) =>{
        res.render("dashboard/dashboard", { layout: 'adm.handlebars'})
    })
})

module.exports = router