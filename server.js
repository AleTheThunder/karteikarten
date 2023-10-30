const express = require('express');
const http = require('http')
const fs = require('fs')
require('dotenv').config();
const app = express();
const port = process.env.PORT; //Port for the backend to listen on
const helper = require('./helper')
const morgan = require('morgan')

const winston = require('./winston');
const morganformat = ':method on :url by :remote-addr with status code :status took :response-time ms';
app.use(morgan(morganformat, { stream: winston.stream }));

let server = http.createServer(app);
server.listen(port,()=>{
    console.log(`http server listining on Port: ${port}`)
})

app.post('/createUser', async (req, res) =>
{
    try{
        await helper.createUser( req.query.email, req.query.username, req.query.password)
        res.status(200)
        res.send("User wurde erstellt.");
        
    }
    catch(err){
        res.status(500)
        res.send("User erstellen hat nicht funktoniert.")
    }
})

app.delete('/deleteUser', async (req, res) =>
{
    try{
        await helper.deleteUser( req.query.username)
        res.status(200)
        res.send("User wurde gelöscht.");
        
    }
    catch(err){
        res.status(500)
        res.send("User löschen hat nicht funktoniert.")
    }
})

app.post('/createCategory', async (req, res) =>
{
    try{
        await helper.createCategory( req.query.name)
        res.status(200)
        res.send("Kate wurde erstellt..");
        
    }
    catch(err){
        res.status(500)
        res.send("Kategorie löschen hat nicht funktoniert.")
    }
})

app.delete('/deleteCategory', async (req, res) =>
{
    try{
        await helper.deleteCategory( req.query.name)
        res.status(200)
        res.send("Kate wurde erstellt..");
        
    }
    catch(err){
        res.status(500)
        res.send("Kategorie löschen hat nicht funktoniert.")
    }
})

app.post('/createQuestion', async (req, res) =>
{
    try{
        await helper.createQuestion( req.query.category_id, req.query.question, req.query.answer, req.query.difficulty)
        res.status(200)
        res.send("Frage wurde erstellt..");
        
    }
    catch(err){
        res.status(500)
        res.send("Frage erstellen hat nicht funktoniert.")
    }
})

app.delete('/deleteQuestion', async (req, res) =>
{
    try{
        await helper.deleteQuestion( req.query.card_id)
        res.status(200)
        res.send("Frage wurde gelöscht..");
        
    }
    catch(err){
        res.status(500)
        res.send("Frage löschen hat nicht funktoniert.")
    }
})