const mongoose = require('mongoose')
const mongoosePaginate = require("mongoose-paginate-v2")
const Schema = mongoose.Schema



const Imagem = new Schema({
    nome: {
        type: String,
        required: true
    },
    
    legenda : {
    type: String,
    required: false
    },

    local:{
        type: String,
        required: true
    },
    url: {
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

Imagem.plugin(mongoosePaginate)

mongoose.model('imagem', Imagem)
