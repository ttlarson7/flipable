const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

app.use(express.json());


let grading;
async function importGrading() {
  try {
    const module = await import("./../AI/grading.js");
    grading = module.default;
    console.log("grading.js imported successfully", grading)
  } catch (error) {
    console.error("Error importing grading.js:", error);
  }
}

importGrading();






const DBURL = process.env.MONGODB_DATABASE_URL;
app.use(cors());

if (!process.env.MONGODB_DATABASE_URL) {
  console.error("MongoDB URL is not provided!");
  process.exit(1);
}

mongoose
  .connect(`${DBURL}`)
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

const Schema = mongoose.Schema;

const userSchema = new Schema({
  userId: String,
  testsTaken: {
    type: Number,
    default: 0,
  },
  decksCreated: {
    type: Number,
    default: 0,
  },
  cardsCreated: {
    type: Number,
    default: 0,
  },
  decks: {
    type: [
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
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

app.post("/addDeck", async (req, res) => {
  // deckName, deckCategory, deckDesc
  try {
    const newDeck = {
      title: req.body.deckName,
      category: req.body.deckCategory,
      description: req.body.deckDesc,
      cards: [],
    };
    //add deck to current user's deck array, update mongoDB
    await User.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: { decks: newDeck } },
      { new: true, upsert: true }
    );
    res.status(200).send("Deck added successfully");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.post("/addCard/:deckNum", async (req, res) => {
  // cardTerm, cardDef
  try {
    const newCard = {
      term: req.body.term,
      definition: req.body.definition,
    };
    //add card to current user's deck, update mongoDB
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.decks[req.params.deckNum].cards.push(newCard);
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.post("/editCard/:decknum", async (req, res) => {
  try {
    const newCard = {
      term: req.body.cardTerm,
      definition: req.body.cardDef,
    };
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.decks[req.params.decknum].splice(
      req.params.decknum,
      1,
      newCard
    );
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.post("/incrementDeck", async (req, res) => {
  try {
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.decksCreated++;
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.post("/incrementCard", async (req, res) => {
  try {
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.cardsCreated += 1;
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.post("/incrementTests", async (req, res) => {
  try {
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.testsTaken++;
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

//calls test, passes in real definitions, test definitions, terms
app.post("/test", async (req, res) => {
  console.log(req.body.realDef, req.body.answers);
  const finalGrade = await grading.gradeTest(req.body.realDef, req.body.answers);
  res.status(200).send(finalGrade);
});

app.get("/getDecks", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.query.userId });
    if (!user) {
      console.log("User Not Found");
      return res.status(404).send("User Not Found");
    }
    const decks = user.decks;
    if (!decks) {
      console.log("Decks Not Found");
      return res.status(404).send("Decks Not Found");
    }
    res.json(decks);
  } catch (error) {
    console.error(error);
    res.status(404).send("Internal Server Error");
  }
});

app.get("/getFlashcards/:deckNum", async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.query.userId });
    const deckNum = req.params.deckNum;
    if (!user) {
      console.log("User Not Found");
      return res.status(404).send("User Not Found");
    }
    const decks = user.decks;
    if (!decks) {
      console.log("Decks Not Found");
      return res.status(404).send("Decks Not Found");
    }

    if (deckNum < 0 || deckNum >= decks.length) {
      console.log("Invalid Deck Number");
      return res.status(404).send("Invalid Deck Number");
    }

    res.json(decks[deckNum].cards);
  } catch (error) {
    console.error(error);
    res.status(404).send("Internal Server Error");
  }
});

app.delete("/deleteDecks", async (req, res) => {
  try {
    const currentUser = User.findOne({ userId: req.query.userId });
    currentUser.decks.splice(req.query.deckNum, 1);
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.delete("/deleteCard", async (req, res) => {
  try {
    const currentUser = User.findOne({ userId: req.query.userId });
    const decks = currentUser.decks[req.query.deckNume]
    const cards = decks.cards.splice(req.query.i, 1);

    await currentUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

app.post("/decrementDeck", async (req, res) => {
  try {
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.decksCreated--;
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

app.post("/decrementCard", async (req, res) => {
  try {
    const currentUser = await User.findOne({ userId: req.body.userId });
    currentUser.cardsCreated--;
    await currentUser.save();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

// add get stats from db

app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});
