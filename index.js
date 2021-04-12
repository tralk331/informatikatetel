const express = require('express')
const mongoose = require('mongoose')
const Item = require('./models/Item')
const app = express()
app.use(express.urlencoded({
    extended: true
  }))
app.use(express.static('public'));
mongoose.connect('mongodb+srv://reader:readthedb123@infotelek.joqj2.mongodb.net/tetelekdb?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true})
app.set('view engine', 'ejs')
app.get('/', (req,res) => {
    res.redirect('/tetelek')
})
app.get('/newitem', (req,res) => {
    res.render('newitem')
})
app.get('/tetelek', async (req,res) => {
    try{
        const data = await Item.find({}).exec()
        res.render('items', {data: data})
    } catch (err){
        res.status(500).send({message: "Database error"})
    }
  
})
app.get('/tetel/:id', async (req,res) => {
    try{
        const tetel = await Item.findOne({id: req.params.id}).exec()
        res.render('tetel', {data: tetel})
    } catch (err) {
        res.status(500).send({message: "Database error"})
    }
})
app.post('/submit-form', async (req,res) => {
    const submitObject = new Item({
        id: req.body.id,
        task: req.body.task,
        content: req.body.content
    })
    try{
        await submitObject.save()
        res.send("Fasza")
    } catch (err) {
        res.status(500).send({message: "Can't connent to db"})
    }
})
app.listen(5000)