import express from 'express';
import { config as configDotenv } from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser';
import cors from 'cors';

// hidden keys
configDotenv({ path: './backend/.env' });

// mongoclient connection
const url = 'mongodb://localhost:27017'
const client = new MongoClient(url)

const dbName = 'PasswrodManager'

client.connect()


let app = express();
let port = process.env.PORT || 3000;

app.use(bodyParser.json())
app.use(cors())

console.log(process.env.Name);

// to get all passwords for db
app.get('/', async (req, res) => {
    const db = client.db(dbName)
    const collection = db.collection('Passwords');
    const findResult = await collection.find({}).toArray();
    res.json(findResult);
});


// To save password
app.post('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('Passwords');
    const findResult = await collection.insertOne(password)
    res.send({success: true});
});

// Tp delete password
app.delete('/', async (req, res) => {
    const password = req.body
    const db = client.db(dbName)
    const collection = db.collection('Passwords');
    const findResult = await collection.deleteOne(password)
    res.send({success: true,result: findResult});
});


app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}`);
});
