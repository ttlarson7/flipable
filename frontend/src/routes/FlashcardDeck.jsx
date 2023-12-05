import axios from "axios"
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useUser } from "@clerk/clerk-react"
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FlashcardContext } from "../App";
import Flashcard from "../components/Flashcard";

const FlashcardDeck = () => {
  const { flashCards, setFlashCards} = useContext(FlashcardContext);
  const [loading, setLoading] = useState(true);
  let ran = false;
  const user = useUser().user;
  const user_id = user?.id.toString();
  const { deckNum } = useParams();

  useEffect(() => {
    if (!ran) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ran = true;
      setLoading(true);
      axios
        .get(`/get_flashcards/${deckNum}`, {
          params: {
            user_id: user_id,
          },
        })
        .then((res) => {
          setFlashCards(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  // if no cards, output empty cards
  if (loading) {
    return (
      <div className="bg-neutral">
        <Navbars page="flashcards"></Navbars>
        <div className="min-h-screen flex justify-center">
          <span className="loading loading-infinity loading-lg self-center"></span>
        </div>
        <Footer></Footer>
      </div>
    );
  }

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
            <Flashcard
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
