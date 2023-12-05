require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
process.env['PORT'] = 3001;
const mongoose = require('mongoose');

const grading = require('./../AI/grading.js');


const DBURL = process.env.MONGODB_DATABASE_URL
app.use(cors())

if (!process.env.MONGODB_DATABASE_URL) {
    console.error('MongoDB URL is not provided!');
    process.exit(1);
}

main().catch(err => console.log(err));


async function main() {
  await mongoose.connect(`${DBURL}`);

}

const Schema = mongoose.Schema;

const userSchema = new Schema({
    userId: String, 
    decks: [
        {
            title: String,
            category: String,
            description: String,
            cards: [
                {
                    term: String,
                    definition: String
                }
            ]
        }
    ]
});


const User = mongoose.model("User", userSchema);


app.post('/add_deck', async(req, res) => {
    // deckName, deckCategory, deckDesc
    try{
        const newDeck = {
            name: req.body.deckName,
            category: req.body.deckCategory,
            description: req.body.deckDesc
        };
        //add deck to current user's deck array, update mongoDB
        const currentUser = User.findOne({userId: req.body.user_id});
        currentUser.decks.push(newDeck);
        currentUser.save();
    } catch{
        console.error(error);
        res.status(404);
    }

})

app.post('/add_card/:decknum', async(req, res) => {
    // cardTerm, cardDef
    try{
        const newCard = {
            term: req.body.cardTerm,
            definition: req.body.cardDef,
            deckNum: req.params.decknum
        };
        //add card to current user's deck, update mongoDB
        const currentUser = User.findOne({userId: req.body.user_id});
        currentUser.decks[cardDeck].push(newCard);
        currentUser.save();
    } catch{
        console.error(error);
        res.status(404);
    }
});

//calls test, passes in real definitions, test definitions, terms
app.post('/test', async(req, res) => {
    const finalGrade = await grading(req.body.realDef, req.body.testDef, req.body.terms);
    res.status(200).send(finalGrade);
});

app.get('/get_decks', async(req, res) => {
    try {
        const result = await User.findOne({user_id: req.query.user_id});
        res.json(result.cardDeck);
    } catch (error) {
        console.error(error);
        res.status(404).send('Internal Server Error');
    }
});

app.get('/get_flashcards/:decknum', async (req, res) => {
    try {
        const result = await User.findOne({user_id: req.query.user_id});
        const deckNum = req.params.decknum;
        res.json(result.cardDeck[deckNum]);
    } catch (error) {
        console.error(error);
        res.status(404).send('Internal Server Error');
    }
});

function removeDeck(parentId, deckIndex){
    try{
        const currentUser = User.findOne({userId: parentId});
        currentUser.decks.splice(deckIndex, 1);
        currentUser.save();
        console.log("success");
    } catch{
        console.log("error");
    }
}

function removeCard(parentId, deckIndex, cardIndex){
    try{
        const currentUser = User.findOne({userId: parentId});
        currentUser.decks[deckIndex].splice(cardIndex, 1);
        currentUser.save();
    } catch{
        console.log("error");
    }
}

app.get('/', function (req, res) {
    res.send("Hello World!");
});


app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});




