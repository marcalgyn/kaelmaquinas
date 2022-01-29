//Carregar os Modulos
const express = require("express")
const router = express.Router()
const passport = require("passport")
const mongoose = require("mongoose")
require("../models/Usuario")
const Usuario = mongoose.model("usuario")

const bcryptjs = require("bcryptjs")
const multer = require("multer")
const path = require("path")
const fs = require("fs") //file string
const { eAdmin } = require("../helpers/eAdmin")

router.get("/login", (req, res) => {
    res.render("usuario/login", { layout: 'login.handlebars' })
})

router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/dashboard/",
        failureRedirect: "/usuario/login",
        failureFlash: true
    })(req, res, next)
})

router.get("/logout", (req, res) => {

    req.logOut()
    req.flash("success_msg", "Deslogado com sucesso!")
    res.redirect("/usuario/login")

})

router.get('/cadastro-usuario', (req, res) =>{
    res.render('usuario/cadastro-usuario', {layout: "adm.handlebars"})
})


router.post("/insert-cad-usuario", eAdmin, (req, res) => {

    var dados_usuario = req.body
    var errors = []

    if (!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        errors.push({ error: "Erro: Necessário preencher o Nome do Usuario!" })
    }
    if (errors.length > 0) {
        res.render("usuario/cadastro-usuario", { layout: 'adm.handlebars', errors: errors, usuario: dados_usuario })
    } else {

        bcryptjs.genSalt(10, (erro, salt) => {
            bcryptjs.hash(req.body.senha, salt, (erro, hash) => {
                if (erro) {
                    res.send("Erro ao tentar criptografar a senha")
                } else {
                    var senha_cript = hash
                    new Usuario({
                        nome: req.body.nome,
                        email: req.body.email,
                        senha: senha_cript
                    }).save().then(() => {
                        req.flash("success_msg", "Usuario Cadastrado com sucesso")
                        res.redirect("/usuario/vis-usuario")
                    }).catch((erro) => {
                        req.flash("error_msg", "O Sobre Não foi editado com sucesso")
                        res.redirect("/usuario/edit-usuario")
                    })

                }

            })
        })
    }


})



router.get("/vis-usuario", eAdmin, (req, res) => {

    const {page = 1 } = req.query
    Usuario.paginate({}, { page, limit: 5 }).then((usuario) => {
        res.render("usuario/vis-usuario", { layout: 'adm.handlebars', usuarios: usuario })

    }).catch((erro) => {
        req.flash("error_msg", "Error: Nenhum Usuario de contato encontrado!")
        res.redirect("/dashboard/")
    })

/*
    Usuario.find({}).then((usuario) => {
        res.render("usuario/vis-usuario", { layout: 'adm.handlebars', usuario: usuario })
    }).catch((erro) => {
        req.flash("error_msg", "Não foi encontrado nenhum registro de Usuario!")
        res.redirect("/dashboard/")
    })
*/

})


module.exports = router