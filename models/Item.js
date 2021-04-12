const mongoose = require('mongoose')

const ItemSchema = mongoose.Schema({
    id: {
        type: Number,
        required: true
    },
    task: String,
    content: String
})

module.exports = mongoose.model('tetelek',ItemSchema)