import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FlashcardContext } from "../App";
import { useContext } from "react";
import FlashcardDecks from "./FlashcardDecks";

const FlashcardDeck = () => {
  const { flashCards } = useContext(FlashcardContext);

  // if no cards, output empty cards
  if (flashCards.length === 0) {
    return (
      <>
        <Navbars page="flashcards"></Navbars>
        <div className="hero min-h-screen bg-neutral">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">No Cards?</h1>
              <p className="py-6 text-4xl">
                Press <b>Add</b> to add a new flashcard!
              </p>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }

  return (
    <>
      <Navbars page="flashcards"></Navbars>
      <div className="mt-24 bg-neutral"></div>
      <div className=" min-h-screen">
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 m-4">
          {flashCards.map((card, i) => (
            <FlashcardDecks
              key={i}
              term={card.term}
              definition={card.definition}
            />
          ))}
        </ul>
      </div>
      <Footer></Footer>
    </>
  );
};

export default FlashcardDeck;
