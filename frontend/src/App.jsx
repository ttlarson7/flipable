import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp,
} from "@clerk/clerk-react";
import { Route, Routes, BrowserRouter, useNavigate } from "react-router-dom";
// import { useState } from "react";
import Landing from "./routes/Landing";
import ScrollTop from "./components/ScrollTop";
import Invalid from "./routes/Invalid";
import "./index.css";

const ClerkRoutes = () => {
  const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  const navigate = useNavigate();
  // const [flashcardDecks, setFlashcardDecks] = useState([]);
  // const [flashcards, setFlashcards] = useState([]);

  return (
    <ClerkProvider publishableKey={clerkPubKey} navigate={(to) => navigate(to)}>
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
                <Landing />
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
