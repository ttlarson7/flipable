import { useState, useContext } from "react";
import { FlashcardContext } from "../App";
import { useNavigate } from "react-router-dom";
import Navbars from "../components/Navbars";
import Footer from "../components/Footer";
import { FaCaretLeft, FaCaretRight } from "react-icons/fa";

function FlashcardsPractice() {
  const navigate = useNavigate();
  const { flashCards } = useContext(FlashcardContext);
  const [deck, setDeck] = useState([...flashCards]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleAddBackToDeck = () => {
    const shuffledDeck = [...deck];
    const removedCard = shuffledDeck.splice(currentCardIndex, 1)[0];
    const randomIndex = Math.floor(Math.random() * (shuffledDeck.length + 1));
    shuffledDeck.splice(randomIndex, 0, removedCard);
    setDeck(shuffledDeck);

    // Update currentCardIndex
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % shuffledDeck.length);
  };

  const handleGotItRight = () => {
    const updatedDeck = [...deck];
    updatedDeck.splice(currentCardIndex, 1);
    setDeck(updatedDeck);

    // Update currentCardIndex
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % updatedDeck.length);
  };

  const reset = () => {
    setCurrentCardIndex(0);
    setDeck([...flashCards]);
  };

  if (flashCards.length === 0) {
    return (
      <>
        <Navbars page="flashcard-practice"></Navbars>
        <div className="hero min-h-screen bg-neutral">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Hey nothing here?</h1>
              <p className="py-6">
                If you want to practice, go back and add some cards!
              </p>
              <button onClick={() => navigate(-1)} className="btn btn-primary">
                Go Back
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }

  if (deck.length === 0) {
    return (
      <>
        <Navbars page="flashcard-practice"></Navbars>
        <div className="hero min-h-screen bg-neutral">
          <div className="hero-content text-center">
            <div className="max-w-md">
              <h1 className="text-5xl font-bold">Nice job!</h1>
              <p className="py-6">
                Now that you&rsquo;ve reached the end of the deck, you can
                return back if you&rsquo;re done or press the <b>Restart</b>{" "}
                button to continue!
              </p>
              <button onClick={reset} className="btn btn-primary">
                Restart
              </button>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen overflow-hidden">
      <Navbars page="flashcard-practice"></Navbars>
      <div>
        {deck.length > 0 && (
          <div className="absolute left-1/2 transform -translate-x-1/2 w-96 md:w-64 lg:w-80 xl:w-96 top-32">
            <label className="swap swap-flip text-3xl w-96 md:w-64 lg:w-80 xl:w-96">
              <input type="checkbox" />
              <div className="card items-center text-center swap-off bg-base-100 h-64 md:h-80 lg:h-96 xl:h-96 flex justify-center border border-primary">
                <div className="bg-primary border border-primary rounded">
                  <p className="card-title text-base-100 font-bold text-2xl ml-3 mr-3 mb-1 ">
                    {deck[currentCardIndex].term}
                  </p>
                </div>
              </div>
              <div className="card items-center text-center swap-on bg-base-100 h-64 md:h-80 lg:h-96 xl:h-96 flex justify-center border border-primary overflow-auto">
                <div className="max-w-full pt-6">
                  <p className="text-2xl m-4 whitespace-normal break-words">
                    {deck[currentCardIndex].definition}
                  </p>
                </div>
              </div>
            </label>
          </div>
        )}
      </div>
      <div className="flex justify-center mt-[550px]">
        {deck.length > 0 && (
          <>
            <button
              onClick={handleAddBackToDeck}
              className="btn btn-primary mr-4"
            >
              <FaCaretLeft /> Add back to deck
            </button>
            <button onClick={handleGotItRight} className="btn btn-primary">
              Got it right <FaCaretRight />
            </button>
          </>
        )}
      </div>
      <div className="mt-20"></div>
      <Footer></Footer>
    </div>
  );
}

export default FlashcardsPractice;
