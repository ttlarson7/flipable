import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import Landing from "./routes/Landing";
import ScrollTop from "./components/ScrollTop";
import Invalid from "./routes/Invalid";
import "./index.css";
import Decks from "./routes/FlashcardDecks";
import FlashcardDeck from "./routes/FlashcardDeck";
import FlashcardsPractice from "./routes/FlashcardsPractice";
import Decktest from "./routes/Decktest";
import AboutUs from "./routes/AboutUs";
import ContactUs from "./routes/ContactUs";
import Stats from "./routes/Stats";

// we now have context for each componenet wanting to get access to flashcardDecks and flashcards
export const FlashcardContext = createContext();

const ClerkRoutes = () => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const navigate = useNavigate();
  const [flashDecks, setFlashcardDecks] = useState([
    { deckName: "CS290", deckDesc: "web development", deckCategory: "Comp Sci" },
    { deckName: "CS261", deckDesc: "data structures", deckCategory: "Comp Sci" },
  ]);
  const [flashCards, setFlashCards] = useState([
    {
      term: "react",
      definition:
        "A frontend library for creating components. It is widely used in web development and allows users to create reusable components.",
    },
    {
      term: "vue",
      definition:
        "A frontend library for creating components. It is widely used in web development and allows users to create reusable components.",
    },
    {
      term: "angular",
      definition:
        "A frontend library for creating components. It is widely used in web development and allows users to create reusable components.",
    },
    {
      term: "svelte",
      definition:
        "A frontend library for creating components. It is widely used in web development and allows users to create reusable components.",
    },
    {
      term: "ember",
      definition:
        "A frontend library for creating components. It is widely used in web development and allows users to create reusable components.",
    },
    {
      term: "backbone",
      definition:
        "A frontend library for creating components. It is widely used in web development and allows users to create reusable components.",
    },
    // Add more terms below
    {
      term: "express",
      definition:
        "A web application framework for Node.js, designed for building web applications and APIs.",
    },
    {
      term: "mongoDB",
      definition:
        "A NoSQL database that provides high performance, high availability, and easy scalability.",
    },
    // Add as many terms as needed
  ]);

  return (
    <FlashcardContext.Provider
      value={{ flashDecks, setFlashcardDecks, flashCards, setFlashCards }}
    >
      <ClerkProvider
        publishableKey={clerkPubKey}
        navigate={(to) => navigate(to)}
      >
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/sign-in/*"
            element={<SignIn routing="path" path="/sign-in" />}
          />
          <Route
            path="/sign-up/*"
            element={<SignUp routing="path" path="/sign-up" />}
          />
          <Route
            path="/flashcards"
            element={
              <>
                <SignedIn>
                  <Decks />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/flashcards/:deckNum"
            element={
              <>
                <SignedIn>
                  <FlashcardDeck />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/flashcards/:deckNum/flashcard-practice"
            element={
              <>
                <SignedIn>
                  <FlashcardsPractice />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route
            path="/flashcards/:deckNum/test"
            element={
              <>
                <SignedIn>
                  <Decktest />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route path="/about-us" element={<AboutUs></AboutUs>}></Route>
          <Route path="/contact-us" element={<ContactUs></ContactUs>}></Route>
          <Route
            path="/stats"
            element={
              <>
                <SignedIn>
                  <Stats />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          />
          <Route path="*" element={<Invalid />}></Route>
        </Routes>
      </ClerkProvider>
    </FlashcardContext.Provider>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <ScrollTop />
      <ClerkRoutes />
    </BrowserRouter>
  );
};

export default App;
