// Import required modules
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");

app.use(express.json());

// Import grading module
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

// Create User model based on the schema
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

// Create User model based on the schema
const User = mongoose.model("User", userSchema);

// API endpoint to perform a test using the grading module
app.post("/test", async (req, res) => {
    
    const finalGrade = await grading.gradeTest(req.body.realDef, req.body.answers);
    res.status(200).send(finalGrade);
});
  
// API endpoint to get all decks of a user
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

// API endpoint to get all flashcards from a specific deck of a user
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

// API endpoint to add a new deck to the user's decks
app.post("/addDeck", async (req, res) => {
    try {
        const newDeck = {
        title: req.body.title,
        category: req.body.category,
        description: req.body.description,
        cards: [],
        };
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

// API endpoint to add a new card to a specific deck
app.post("/addCard/:deckNum", async (req, res) => {
    try {
        const newCard = {
        term: req.body.term,
        definition: req.body.definition
        };
        const currentUser = await User.findOne({ userId: req.body.userId });
        currentUser.decks[req.params.deckNum].cards.push(newCard);
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

// API endpoint to increment the count of decks created by a user
app.post("/incrementDeck", async (req, res) => {
    try {
        const currentUser = await User.findOne({ userId: req.body.userId });
        currentUser.decksCreated++;
        await currentUser.save();
        res.status(200).send("Incremented Deck");
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
        res.status(200).send("Incremented Card");
    } catch (error) {
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
        res.status(200).send("Incremented Tests");
    } catch (error) {
        console.error(error);
        res.status(400);
    }
});

// API endpoint to return user statistics
app.get("/getUser", async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.query.userId });
        const userStats = {
            decksCreated: user.decksCreated,
            cardsCreated: user.cardsCreated,
            testsTaken: user.testsTaken
        };
        res.json(userStats);
    } catch (error) {
        console.error(error);
        res.status(404).send("Internal Server Error");
    }
})

// API endpoint to perform a test using the grading module
app.post("/test", async (req, res) => {
    console.log(req.body.realDef, req.body.answers);
    const finalGrade = await grading.gradeTest(req.body.realDef, req.body.answers);
    res.status(200).send(finalGrade);
});

// API endpoint to get all decks of a user
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

// API endpoint to get all flashcards from a specific deck of a user
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

// API endpoint to delete a user's decks
app.delete("/deleteDecks", async (req, res) => {
    try {
        const num = parseInt(req.query.deckNum)
        const currentUser = await User.findOne({ userId: req.query.userId });
        currentUser.decks.splice(num, 1);
        await currentUser.save();
        res.status(200).send("Deleted Deck");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
});

// API endpoint to delete a card from a specific deck of a user
app.delete("/deleteCard", async (req, res) => {
    try {
        const num = parseInt(req.query.deckNum)
        const currentUser = await User.findOne({ userId: req.query.userId });
        currentUser.decks[num].cards.splice(req.query.i, 1);
        await currentUser.save();
        res.status(200).send("Deleted Card");
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on port: " + PORT);
});
