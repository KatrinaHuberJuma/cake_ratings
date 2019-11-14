const mongoose = require('mongoose');
const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.static( __dirname + '/public/dist/public' ));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/cakes');

const CakeSchema = new mongoose.Schema({
    name: String,
    baker: String,
    imageUrl: String,
    ratings: Array
})


const Cake = mongoose.model("Cake", CakeSchema);


app.get('/cakes', (request, response) => {
    console.log("__________________________________________________________")
    Cake.find({})
        .then(cakes => response.json(cakes))
        .catch(err => response.json(err));

});

app.get('/cakes/:id', (request, response) => {
    console.log(request.params.id)
    Cake.find({_id:request.params.id})
        .then(cake => response.json(cake))
        .catch(err => response.json(err));

});

app.post('/cakes', (request, response) => {
    console.log("server post route happening", request.body)
        Cake.create(request.body)
            .then(cakes => response.json(cakes))
            .catch(err => response.json(err)); 
    
});

app.put('/cakes/:id', (request, response) => {
    console.log("cake in server: ", request.body)
    Cake.updateOne({_id:request.params.id}, {$set: request.body})
        .then(cake => response.json(cake))
        .catch(err => response.json(err));

});






app.listen(8000, () => console.log("listening on port 8000"));