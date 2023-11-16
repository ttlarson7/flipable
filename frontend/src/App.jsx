import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
import { useState, createContext } from "react";
import Landing from "./routes/Landing";
import ScrollTop from "./components/ScrollTop";
import Invalid from "./routes/Invalid";
import "./index.css";
import Flashcards from "./routes/Flashcards";

// we now have context for each componenet wanting to get access to flashcardDecks and flashcards
export const FlashardContext = createContext();

const ClerkRoutes = () => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const navigate = useNavigate();
  const [flashcardDecks, setFlashcardDecks] = useState([]);
  const [flashcards, setFlashcards] = useState([]);

  return (
    <FlashardContext.Provider
      value={{ flashcardDecks, setFlashcardDecks, flashcards, setFlashcards }}
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
                  <Flashcards />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </>
            }
          ></Route>
          <Route path="*" element={<Invalid />}></Route>
        </Routes>
      </ClerkProvider>
    </FlashardContext.Provider>
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
