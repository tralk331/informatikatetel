const express = require('express')
const mongoose = require('mongoose')
const Item = require('./models/Item')
const app = express()

//use express.urlencoded to access the post data from the form
//It is not avaliable for users yet

/* app.use(express.urlencoded({
    extended: true
  })) */


//specify the static folder
app.use(express.static('public'));
//mongodb connection for readers
//It is public
mongoose.connect(process.env.mongoconnection, {useNewUrlParser: true, useUnifiedTopology: true})

//View engine: ejs
app.set('view engine', 'ejs')

//Root page redirect
app.get('/', (req,res) => {
    res.redirect('/tetelek')
})
//Adding new item not avaliable yet

/*app.get('/newitem', (req,res) => {
    res.render('newitem')
})*/

//Get all documents form the database, pass the data to the view engine
app.get('/tetelek', async (req,res) => {
    try{
        const data = await Item.find({}).exec()
        res.render('items', {data: data})
    } catch (err){
        res.status(500).send({message: "Database error"})
    }
  
})

//Get only one document
app.get('/tetel/:id', async (req,res) => {
    try{
        const tetel = await Item.findOne({id: req.params.id}).exec()
        res.render('tetel', {data: tetel})
    } catch (err) {
        res.status(500).send({message: "Database error"})
    }
})

//Path for uploading data, not avaliable 
/*app.post('/submit-form', async (req,res) => {
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
})*/
//Listen on port specified in env, or 5000
app.listen(process.env.PORT || 5000)