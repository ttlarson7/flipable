require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000;
const mongoose = require('mongoose');

const DBURL = process.env.MONGODB_DATABASE_URL
app.use(cors())

if (!process.env.MONGODB_DATABASE_URL) {
    console.error('MongoDB URL is not provided!');
    process.exit(1);
}

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`${DBURL}`);

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: String,
    decks: [{type: Schema.Types.ObjectId, ref: "Deck"}],
});

const deckSchema = new Schema({
    name: String,
    category: String,
    description: String,
    cards: [{type: Schema.Types.ObjectId, ref: "Card"}],
    parentUser: {type: Schema.Types.ObjectId, ref: "User"},
});

const cardSchema = new Schema({
    term: String,
    definition: String,
    parentDeck: {type: Schema.Types.ObjectId, ref:"Deck"},
});








app.get('/', (req, res) => {
    res.send("Hello World!");
})


app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});




