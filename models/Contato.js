const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema



const Contato = new Schema({
    nome: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    assunto: {
        type: String,
        required: true
    },
    mensagem: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now()
    },

    updateAt: {
        type: Date,
        required: false
    }

})

Contato.plugin(mongoosePaginate)

mongoose.model('contato', Contato)
