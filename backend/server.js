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

await mongoose.connect(`${DBURL}`);

async function main() {
  addUser("23rjklsd908f0s");
  addDeck("CS 261", "Computer Science", "Data structures flashcards", 0, "23rjklsd908f0s");
  addCard("Array", "Collection of items of same data type stored at contiguous memory locations", 0, "23rjklsd908f0s");
}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: {
        type: String, 
        required: true
    },
    decks: [{
        type: Schema.Types.ObjectId, 
        ref: "Deck"
    }],
});

const deckSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    cards: [{
        type: Schema.Types.ObjectId, 
        ref: "Card",
        required: true
    }],
    index: {
        type: Number,
        required: true
    },
    parentUser: {
        //user id of parent user
        type: String,
        required: true
    },
});

const cardSchema = new Schema({
    term: {
        type: String,
        required: true
    },
    definition: {
        type: String,
        required: true
    },
    parentDeck: {
        //index of parent deck
        type: Number,
        required: true
    },
    parentUser: {
        //user id of parent user
        type: String,
        required: true
    }
});

const User = mongoose.model("User", userSchema);
const Deck = mongoose.model("Deck", deckSchema);
const Card = mongoose.model("Card", cardSchema);

function addUser(newId){
    try{
        const newUser = User.create({
            userId: newId,
            decks: []
        });
        //add user to mongodb database
        newUser.save();
        console.log("success");
    } catch{
        console.log("error");
    }
}

app.post('/addDeck', async(req, res) => {
    // deckName, deckCategory, deckDesc
    try{
        const newDeck = {
            name: req.body.deckName,
            category: req.body.deckCategory,
            description: req.body.deckDesc
        };
        //add deck to current user's deck array, update mongoDB
        const currentUser = User.findOneAndUpdate(
            {userId: req.body.user_id},
            {upsert: true}
        );
        currentUser.decks.push(newDeck);
        currentUser.save();
        res.status(200);
    } catch{
        console.error(error);
        res.status(404);
    }
})

app.post('/addCard/:decknum', async(req, res) => {
    // cardTerm, cardDef
    try{
        const newCard = {
            term: req.body.cardTerm,
            definition: req.body.cardDef,
            deckNum: req.params.decknum
        };
        //add card to current user's deck, update mongoDB
        const currentUser = await User.findOne({userId: req.body.userId});
        currentUser.decks[cardDeck].push(newCard);
        currentUser.save();
    } catch{
        console.error(error);
        res.status(404);
    }
})

app.get('/getDecks', async(req, res) => {
    try {
        const result = await User.findOne({userId: req.query.userId});
        res.json(result.cardDeck);
    } catch (error) {
        console.error(error);
        res.status(404).send('Internal Server Error');
    }
});

app.get('/getFlashcards/:decknum', async (req, res) => {
    try {
        const result = await User.findOne({userId: req.query.userId});
        const deckNum = req.params.decknum;
        res.json(result.cardDeck[deckNum]);
    } catch (error) {
        console.error(error);
        res.status(404).send('Internal Server Error');
    }
});

app.get('/deleteDecks', async(req, res) => {
    try{
        const currentUser = User.findOne({userId: req.query.userId});
        currentUser.decks.splice(deckIndex, 1);
        currentUser.save();
        res.status(200);
    } catch (error) {
        console.error(error);
        res.status(404).send('Internal Server Error');
    }
});

app.get('/deleteCard', async(req, res) => {
    try{
        const currentUser = User.findOne({userId: req.query.userId});
        currentUser.decks[deckIndex].splice(cardIndex, 1);
        currentUser.save();
    } catch (error) {
        console.error(error);
        res.status(404).send('Internal Server Error');
    }
})


app.get('/', function (req, res) {
    res.send("Hello World!");
    addUser("23rjklsd908f0s");
    addDeck("CS 261", "Computer Science", "Data structures flashcards", 0, "23rjklsd908f0s");
    addCard("Array", "Collection of items of same data type stored at contiguous memory locations", 0, "23rjklsd908f0s");
})


app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});




