const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secret = "chinmay123";
const {v4: uuidv4} = require('uuid');

const pizzaList = require('./schema/pizzaList');
const order = require('./schema/orderModel');
const orderModel = require('./schema/orderModel');
const userModel = require('./schema/userSchema');
const server = express();

mongoose.connect("mongodb://localhost:27017/pizzadb", (error) => {
    if(error) throw error;
    console.log("Connected to mongodb");
})

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.get('/', async (request, response) => {
    const data = await pizzaList.find();
    response.json(data);
})

server.post('/add', async (request, response) => {
    // console.log(request.body);
    pizzaList.insertMany({name: request.body.name, image: request.body.image}, (error) => {
        if(error) throw error;
        response.send('Data entered successfully');
    });
})

server.post('/order', async(request, response) => {
    const orderid = "ORD-" +uuidv4();
    // console.log(request.body.pizza);
    const arr = request.body.pizza;
    console.log(arr);
    const status = await orderModel.insertMany({id: orderid, order: arr});
    console.log(status);
    response.send(orderid);
})

server.get('/order', async(request, response) => {
    const orders = await orderModel.find();
    response.json(orders);
})

//registration

server.post('/form', (request, response) => {
    console.log(request.body);
    const username = request.body.username;
    const password = request.body.password;
    userModel.insertMany({ username: username, password: password }, (err) => {
        // if (err) response.status(203).send(err.message);
        if(err) {
            console.log(err.name);
            response.status(202).send(err.name);
        }
        else response.send('data added successfully.');
    });
})

//login + token -> store in local storage

server.post('/login', (request, response) => {
    const username = request.body.username;
    const password = request.body.password;

    const payload = {
        uid: username
    }

    userModel.find({ username: username, password: password }, (err) => {

        token = jwt.sign(payload, secret, { expiresIn: "2h" });
        console.log("token:");
        console.log(token);

        if (err) response.send(err);
        else response.send(token);
    })
})

server.post('/check', (request, response) => {
    const tkn = request.body.token;
    response.send(jwt.verify(tkn, secret, (err, data) => {
        if(err) response.send(err);
        else response.send(data);
    }));
})

server.listen(8090);