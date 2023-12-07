// Import required modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

// Import grading module
app.use(express.json());

let grading;
try {
  grading = import("./../AI/grading.js");
} catch (error) {
  console.error("Error importing grading.js:", error);
}

// Set up MongoDB connection
const DBURL = process.env.MONGODB_DATABASE_URL;
app.use(cors());

// Check if MongoDB URL is provided
if (!process.env.MONGODB_DATABASE_URL) {
  console.error("MongoDB URL is not provided!");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(`${DBURL}`)
  .then(console.log("Connected to DB"))
  .catch((err) => console.log(err));

// Define MongoDB schema for user data
const Schema = mongoose.Schema;
const userSchema = new Schema({
  userId: String,
  testsTaken: {
    type: Number,
    default: 0
  },
  decksCreated: {
    type: Number,
    default: 0
  },
  cardsCreated: {
    type: Number,
    default: 0
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
                    definition: String
                }
            ]
        }
    ],
    default: []
  }
});

// Create User model based on the schema
const User = mongoose.model("User", userSchema);

// API endpoint to get all decks of a user
app.get("/getDecks", async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.userId });
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
  
  // API endpoint to get all flashcards from a specific deck of a user
  app.get("/getFlashcards/:decknum", async (req, res) => {
    try {
      const user = await User.findOne({ userId: req.params.userId });
      const deckNum = req.params.decknum;
      if (!user) {
          console.log("User Not Found");
          return res.status(404).send("User Not Found");
      }
      const decks = user.decks;
      if (!decks) {
          console.log("Decks Not Found");
          return res.status(404).send("Decks Not Found");
      }
      res.json(decks[deckNum]);
    } catch (error) {
      console.error(error);
      res.status(404).send("Internal Server Error");
    }
  });

// API endpoint to add a new deck to the user's decks
app.post("/addDeck", async (req, res) => {
  try {
    const newDeck = {
      title: req.body.deckName,
      category: req.body.deckCategory,
      description: req.body.deckDesc,
      cards: [],
    };
    // Add deck to current user's deck array, update mongoDB
    await User.findOneAndUpdate(
      { userId: req.body.userId },
      { $push: {decks: newDeck} },
      { new: true, upsert: true }
    );
    res.status(200).send("Deck added successfully");
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

// API endpoint to add a new card to a specific deck
app.post("/addCard/:decknum", async (req, res) => {
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
  } catch (error) {
    console.error(error);
    res.status(400);
  }
});

// API endpoint to increment the count of decks created by a user
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

// API endpoint to increment the count of cards created by a user
app.post("/incrementCard", async (req, res) => {
    try {
        const currentUser = await User.findOne({ userId: req.body.userId });
        currentUser.cardsCreated++;
        await currentUser.save();
        res.status(200);
    } catch(error) {
        console.error(error);
        res.status(400);
    }
});

// API endpoint to increment the count of tests taken by a user
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


// API endpoint to edit a card in a specific deck
app.post("/editCard/:decknum", async (req, res) => {
    try {
      const newCard = {
        term: req.body.cardTerm,
        definition: req.body.cardDef,
      };
      const currentUser = await User.findOne({ userId: req.body.userId });
      currentUser.decks[req.params.decknum].splice(req.params.decknum, 1, newCard);
      await currentUser.save();
      res.status(200);
    } catch (error) {
      console.error(error);
      res.status(400);
    }
});

// API endpoint to delete a user's decks
app.get("/deleteDecks", async (req, res) => {
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

// API endpoint to delete a card from a specific deck of a user
app.get("/deleteCard", async (req, res) => {
  try {
    const currentUser = User.findOne({ userId: req.query.userId });
    currentUser.decks[req.query.deckNum].splice(req.query.i, 1);
    await currentUser.save();
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

// API endpoint to decrement the count of decks created by a user
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

// API endpoint to decrement the count of cards created by a user
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

// API endpoint to perform a test using the grading module
app.post("/test", async (req, res) => {
    const finalGrade = await grading(
      req.body.realDef,
      req.body.testDef,
    );
    res.status(200).send(finalGrade);
  });
  

// Start the server
app.listen(PORT, () => {
  console.log("Server is running on port: " + PORT);
});