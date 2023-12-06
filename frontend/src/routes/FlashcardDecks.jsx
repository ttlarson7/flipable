import { useContext, useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import { FlashcardContext } from "../App";
import Footer from "../components/Footer";
import Navbars from "../components/Navbars";
import Deckcard from "../components/Deckcard";
const FlashcardDecks = () => {
  let ran = false;
  const [loading, setLoading] = useState(true);
  const user = useUser().user;
  const user_id = user?.id.toString();

  const { flashDecks, setFlashcardDecks } = useContext(FlashcardContext);

  useEffect(() => {
    if (!ran) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ran = true;
      setLoading(true);
      axios
        .get("/get_decks", {
          params: {
            user_id: user_id,
          },
        })
        .then((res) => {
          setFlashcardDecks(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, []);

  if (loading) {
    return (
      <div className="bg-neutral">
        <Navbars page="decks" flashDecks={flashDecks} setFlashcardDecks={setFlashcardDecks}></Navbars>
        <div className="min-h-screen flex justify-center">
          <span className="loading loading-infinity loading-lg self-center"></span>
        </div>
        <Footer></Footer>
      </div>
    );
  }

  return (
    <div className="bg-neutral">
      <Navbars page="decks" flashDecks={flashDecks} setFlashcardDecks={setFlashcardDecks}></Navbars>
      <div className="mt-24 bg-neutral"></div>
      <div className=" min-h-screen">
        <ul className="grid lg:grid-cols-3 sm:grid-cols-2 gap-4 m-4">
          {flashDecks.map((deck, i) => (
            <Deckcard
              key={i}
              i={i.toString()}
              title={deck.deckName}
              desc={deck.deckDesc}
              category={deck.deckCategory}
            />
          ))}
        </ul>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default FlashcardDecks;
