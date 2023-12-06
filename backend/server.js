const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

let grading;
try {
  grading = import("./../AI/grading.js");
} catch (error) {
  console.error("Error importing grading.js:", error);
}

const DBURL = process.env.MONGODB_DATABASE_URL;
app.use(cors());

if (!process.env.MONGODB_DATABASE_URL) {
  console.error("MongoDB URL is not provided!");
  process.exit(1);
}

// main().catch(err => console.log(err));

mongoose
  .connect(`${DBURL}`)
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

// async function main() {
//   addUser("23rjklsd908f0s");
//   addDeck("CS 261", "Computer Science", "Data structures flashcards", 0, "23rjklsd908f0s");
//   addCard("Array", "Collection of items of same data type stored at contiguous memory locations", 0, "23rjklsd908f0s");
// }

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
          definition: String,
        },
      ],
    },
  ],
});

const User = mongoose.model("User", userSchema);

app.post("/addDeck", async (req, res) => {
  // deckName, deckCategory, deckDesc
  try {
    const newDeck = {
      name: req.body.deckName,
      category: req.body.deckCategory,
      description: req.body.deckDesc,
      cards: [],
    };
    //add deck to current user's deck array, update mongoDB
    const currentUser = User.findOneAndUpdate(
      { userId: req.body.user_id },
      { new: true, upsert: true }
    );
    currentUser.decks.push(newDeck);
    await currentUser.save();
    res.status(200).send("Deck added successfully");
  } catch {
    console.error(error);
    res.status(400);
  }
});

app.post("/addCard/:decknum", async (req, res) => {
  // cardTerm, cardDef
  try {
    const newCard = {
      term: req.body.cardTerm,
      definition: req.body.cardDef,
    };
    //add card to current user's deck, update mongoDB
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.decks[req.params.decknum].push(newCard);
    await currentUser.save();
    res.status(200);
  } catch {
    console.error(error);
    res.status(400);
  }
});

//calls test, passes in real definitions, test definitions, terms
app.post("/test", async (req, res) => {
  const finalGrade = await grading(
    req.body.realDef,
    req.body.testDef,
    req.body.terms
  );
  res.status(200).send(finalGrade);
});

app.get("/getDecks", async (req, res) => {
  try {
    const result = await User.findOne({ userId: req.query.userId });
    res.json(result.cardDeck);
  } catch (error) {
    console.error(error);
    res.status(404).send("Internal Server Error");
  }
});

app.get("/getFlashcards/:decknum", async (req, res) => {
  try {
    const result = await User.findOne({ userId: req.query.userId });
    const deckNum = req.params.decknum;
    res.json(result.cardDeck[deckNum]);
  } catch (error) {
    console.error(error);
    res.status(404).send("Internal Server Error");
  }
});

app.get("/deleteDecks", async (req, res) => {
  try {
    const currentUser = User.findOne({ userId: req.query.userId });
    currentUser.decks.splice(req.query.deckIndex, 1);
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.get("/deleteCard", async (req, res) => {
  try {
    const currentUser = User.findOne({ userId: req.query.userId });
    currentUser.decks[req.query.deckIndex].splice(req.query.cardIndex, 1);
    await currentUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});