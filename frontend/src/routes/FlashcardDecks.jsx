import { useContext } from "react";
import Footer from "../components/Footer";
import Navbars from "../components/Navbars";
import Deckcard from "./Deckcard";
import { FlashcardContext } from "../App";

const FlashcardDecks = () => {
  const { flashDecks } = useContext(FlashcardContext);

  return (
    <div className="bg-neutral">
      <Navbars page="flashcards"></Navbars>

      <div className="mt-24 bg-neutral"></div>
      <div className=" min-h-screen">
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 m-4">
          {flashDecks.map((deck, i) => (
            <Deckcard
              key={i}
              i={i.toString()}
              title={deck.title}
              desc={deck.desc}
            />
          ))}
        </ul>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default FlashcardDecks;
